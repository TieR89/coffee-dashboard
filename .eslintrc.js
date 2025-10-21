/* eslint-disable no-undef */
export default {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    parser: '@typescript-eslint/parser'
  },
  rules: {
    /* ⚙️ Общие упрощения */
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'warn',

    /* ⚙️ Vue-правила */
    'vue/comment-directive': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/order-in-components': 'warn',
    'vue/require-default-prop': 'off',
    'vue/require-prop-types': 'off',
    'vue/no-mutating-props': 'off',
    'vue/no-v-html': 'off',

    /* ⚙️ HTML-форматирование */
    'vue/html-self-closing': [
      'warn',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],

    /* ⚙️ Прочие улучшения */
    '@typescript-eslint/no-unused-vars': 'warn'
  }
}
