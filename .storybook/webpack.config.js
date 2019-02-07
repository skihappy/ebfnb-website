const path = require('path')

module.exports = ({ config, mode }) => ({
  ...config,
  module: {
    ...config.module,
    rules: [
      ...config.module.rules,
      {
        test: /\.(ts|tsx)$/,
        include: path.resolve(__dirname, '../src/'),
        loader: require.resolve('babel-loader'),
      },
    ],
  },
  resolve: {
    ...config.resolve,
    extensions: [...config.resolve.extensions, '.ts', '.tsx'],
  },
})
