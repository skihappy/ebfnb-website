const restrictedGlobals = require('confusing-browser-globals')

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['airbnb', 'plugin:jsx-a11y/recommended', 'prettier'],
  plugins: ['@typescript-eslint', 'react-hooks', 'emotion'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  rules: {
    'emotion/import-from-emotion': 'error',
    'emotion/jsx-import': 'error',
    'emotion/no-vanilla': 'error',
    'emotion/styled-import': 'error',
    'emotion/syntax-preference': ['error', 'string'],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        assert: 'either',
        depth: 3,
      },
    ],
    'no-restricted-globals': ['error'].concat(restrictedGlobals),
    /* @todo Fix this rule! */
    'no-unused-vars': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.tsx'] }],
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        // Allow import and resolve for *.ts modules.
        extensions: ['.js', '.ts', '.tsx'],
      },
    },
  },
}
