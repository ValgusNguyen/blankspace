#!/usr/bin/env bash

set -euo pipefail

ENV_FILE=".env"

# --- Load env vars from .env if present ---
if [ -f "$ENV_FILE" ]; then
    echo "Loading env file: $ENV_FILE"
    set -o allexport
    # shellcheck disable=SC1090
    source "$ENV_FILE"
    set +o allexport
else
    echo "⚠️  No $ENV_FILE found — defaulting to local fallback"
fi

# --- Default connection string ---
DATABASE_URL="${DATABASE_URL:-postgresql://postgres:postgres@localhost:5432/postgres}"

# --- Parse URL parts for docker setup ---
# Example: postgresql://user:pass@host:port/dbname
regex='^postgresql:\/\/([^:]+):([^@]+)@([^:]+):([0-9]+)\/(.+)$'
if [[ $DATABASE_URL =~ $regex ]]; then
    POSTGRES_USER="${BASH_REMATCH[1]}"
    POSTGRES_PASSWORD="${BASH_REMATCH[2]}"
    DB_PORT="${BASH_REMATCH[4]}"
    POSTGRES_DB="${BASH_REMATCH[5]}"
else
    echo "❌ Invalid DATABASE_URL format: $DATABASE_URL"
    exit 1
fi

DB_CONTAINER_NAME="${DB_CONTAINER_NAME:-${PWD##*/}-postgres}"

echo "---------------------------------------"
echo "Using DATABASE_URL:"
echo "  $DATABASE_URL"
echo "Parsed config:"
echo "  Container name : $DB_CONTAINER_NAME"
echo "  User           : $POSTGRES_USER"
echo "  Password       : [hidden]"
echo "  Database       : $POSTGRES_DB"
echo "  Port           : $DB_PORT"
echo "---------------------------------------"

# --- Stop and clean existing container if any ---
if docker ps -a --format '{{.Names}}' | grep -q "^${DB_CONTAINER_NAME}$"; then
    echo "🧹 Cleaning old container..."
    docker stop "$DB_CONTAINER_NAME" >/dev/null
    docker rm "$DB_CONTAINER_NAME" >/dev/null
fi

# --- Run PostgreSQL container ---
echo "🚀 Starting PostgreSQL (Postgres 18-alpine)..."
docker run -d \
    --name "$DB_CONTAINER_NAME" \
    -e POSTGRES_USER="$POSTGRES_USER" \
    -e POSTGRES_PASSWORD="$POSTGRES_PASSWORD" \
    -e POSTGRES_DB="$POSTGRES_DB" \
    -p "$DB_PORT:5432" \
    -v "$DB_CONTAINER_NAME-data:/var/lib/postgresql/data" \
    postgres:18-alpine \
    postgres -c listen_addresses='*'

echo "✅ PostgreSQL container running"
echo "Connect using:"
echo "  $DATABASE_URL"
echo "---------------------------------------"

# --- Run Drizzle migrations if available ---
if command -v npx >/dev/null 2>&1; then
    echo "📦 Running Drizzle migrations..."
    npx drizzle-kit push
    echo "✅ Drizzle migrations done."
else
    echo "⚠️  npx not found — run manually: npx drizzle-kit push"
fi

echo "✨ All set! Run your dev server (e.g. npm run dev)"
