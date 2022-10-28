const paths = require('./paths')
import HtmlWebpackPlugin from 'html-webpack-plugin'

module.exports = {
  // Где webpack смотрит, чтобы начать сборку пакета
  entry: [paths.src + '/index.tsx'],

  // Где webpack выводит активы и пакеты
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: 'auto',
    assetModuleFilename: 'assets/[name][ext]', // Указывает куда класть файлы
    clean: true // Очищает директорию dist перед обновлением бандла Свойство стало доступно с версии 5.20.0, до этого использовался CleanWebpackPlugin
  },

  // Настройте процесс сборки веб-пакета
  plugins: [
    // Генерирует HTML-файл из шаблона
    // Генерирует предупреждение об устаревании: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      title: 'WEBPACK-5 | JS',
      template: 'public/index.html', // файл шаблона
      favicon: 'public/images/example.png',
      filename: 'index.html', // исходящие файл
      inject: 'head'
    })
  ],

  // Определяет, как обрабатываются модули в рамках проекта
  module: {
    rules: [
      // JavaScript: Используйте Babel для переноса файлов JavaScript
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript']
          }
        }
      },

      // Images: Скопируйте файлы изображений в папку сборки
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

      // Fonts and SVGs: Встроенные файлы
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' }
    ]
  },

  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': paths.src,
      assets: paths.public
    }
  }
}
