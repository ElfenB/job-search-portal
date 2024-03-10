module.exports = {
  extends: [
    "@boehringer-ingelheim/eslint-config/base/strict",
    // '@boehringer-ingelheim/eslint-config/react',
    // '@boehringer-ingelheim/eslint-config/playwright',
    // NOTE: Prettier has to be the last one to work
    "prettier",
  ],
  rules: {
    "perfectionist/sort-named-imports": 'warn',
    "perfectionist/sort-named-exports": 'warn',
    "perfectionist/sort-imports": 'warn',
    "perfectionist/sort-objects": 'warn',
    "perfectionist/sort-object-types": 'warn',
    "perfectionist/sort-jsx-props": 'warn',
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
  }
};
