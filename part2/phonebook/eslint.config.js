import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    ignores: [
      "dist/**", 
      "node_modules/**", 
      "build/**", 
      "src/**", 
      "vite.config.js", 
      "eslint.config.js"
    ],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs", 
      globals: {
        ...globals.node,      
      },
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
    },
  }
];