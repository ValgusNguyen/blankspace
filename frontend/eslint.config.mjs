import prettier from "eslint-config-prettier/flat";
import { defineConfig, globalIgnores } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";

const eslintConfig = defineConfig([
  reactHooks.configs.flat["recommended-latest"],
  prettier,
  globalIgnores(["out/**", "build/**", "node_modules/*", ".tanstack/*"]),
]);

export default eslintConfig;
