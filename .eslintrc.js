module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'no-self-assign': 'off',
    'no-case-declarations': 'off',
    'no-use-before-define': 'off',
    'vue/no-v-html': 'off',
    'vue/custom-event-name-casing': 'off',
    'no-unused-vars': ['error', { ignoreRestSiblings: true, argsIgnorePattern: '^_' }]
  }
}
