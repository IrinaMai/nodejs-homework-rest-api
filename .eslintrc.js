module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module'
  },
  rules: {
    semi: [2, "never"],
  }
};
