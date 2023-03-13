module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential', //vue3解析
    'plugin:@typescript-eslint/recommended',
    '@vue/typescript/recommended'
  ],
  overrides: [],
  // "parser": "@typescript-eslint/parser",
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'vue/html-self-closing': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multi-word-component-names': 'off',
    //取消ts非空断言
    '@typescript-eslint/no-non-null-assertion': 'off',
    //ts interface为空取消报错
    '@typescript-eslint/no-empty-interface': 'off'
  },
  globals: {
    defineProps: 'readonly',
    defineOptions: 'readonly'
  }
}
