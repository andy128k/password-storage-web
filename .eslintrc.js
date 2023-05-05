module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "jest"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jest/recommended",
  ],
  rules: {
    quotes: ["off", "double"],
    camelcase: "off",
    semi: "warn",
    "no-use-before-define": ["error", "nofunc"],
    eqeqeq: "warn",
    "no-alert": "warn",
    "no-unused-vars": ["error", { destructuredArrayIgnorePattern: "^_" }],
    "react/prop-types": "off",
    "react/jsx-no-undef": "error",
    "react/jsx-no-bind": "error",
    "react/no-unknown-property": "error",
  },
  settings: {
    react: {
      version: "16.4",
    },
  },
};
