import path from 'path'
const { merge } = require('webpack-merge')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const common = require('./webpack.common')

module.exports = merge(common, {
  // Установите режим для development или production
  mode: 'development',
  // Управляйте тем, как создаются исходные карты
  devtool: 'inline-source-map',

  // Поднять сервер для быстрой разработки
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true
  },

  module: {
    rules: [
      // Styles: Вставьте CSS в head с помощью исходных карт
      {
        test: /\.(sass|scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1, modules: false }
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      },

      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: ['react-refresh/babel'],
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: { plugins: ['react-refresh/babel'] },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    alias: {
      assets: path.join(__dirname, 'assets'),
      src: path.join(__dirname, 'src'),
      lib: path.join(__dirname, 'lib'),
      ui: path.join(__dirname, 'src/ui'),
      root: path.join(__dirname, 'src/modules/root')
    }
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false
    }),
    // new ESLintPlugin({
    //   extensions: ['js', 'jsx', 'ts', 'tsx'],
    //   fix: false,
    //   emitError: true,
    //   emitWarning: true,
    //   failOnError: true
    // }),
    new ReactRefreshWebpackPlugin()
  ]
})
