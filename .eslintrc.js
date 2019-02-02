const restrictedGlobals = require('confusing-browser-globals')

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['airbnb', 'prettier'],
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  rules: {
    'no-restricted-globals': ['error'].concat(restrictedGlobals),
    'no-unused-vars': 'warn',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.tsx'] }]
  },
  settings: {
    'import/resolver': {
      node: {
        // Allow import and resolve for *.ts modules.
        extensions: ['.js', '.ts', '.tsx']
      }
    }
  }
}
