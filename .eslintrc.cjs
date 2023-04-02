module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
    "prettier",
  ],
  parser: "vue-eslint-parser",
  parserOptions: { parser: "@typescript-eslint/parser" },
  rules: {
    "no-undef": "off",
    "no-console": "warn",
    "vue/require-default-prop": "off",
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
  },
};
