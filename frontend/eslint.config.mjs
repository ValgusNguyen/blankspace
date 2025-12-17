import prettier from "eslint-config-prettier/flat";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  prettier,
  globalIgnores(["out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
