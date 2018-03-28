// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
     // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-irregular-whitespace": 0,
    "no-multi-spaces": 0,
    "no-use-before-define": 0,
    "no-tabs": "off",
    "indent": 0,
    "eol-last": 0,
    "no-trailing-spaces": 0,
    "keyword-spacing": 0,
    "no-new-require": 0,
    "no-mixed-spaces-and-tabs": 0,
    "no-unneeded-ternary": 0,
    "no-unused-vars": 0,
    "no-unused-expressions": 0,
    "no-undef": 0,
    "func-call-spacing": 0,
    "semi": 0,
    "one-var": 0
  }
}
