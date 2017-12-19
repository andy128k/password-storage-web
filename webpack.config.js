var HtmlWebpackPlugin = require('html-webpack-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');

var title = 'PasswordStorage Web';

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: __dirname + '/public/',
    publicPath: '/',
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
              camelCase: 'dashes',
              minimize: { zindex: false }
            }
          },
        ]
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /node_modules|tests/,
        options: {
          configPath: __dirname + ".eslintrc"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: title,
      template: __dirname + '/template.html',
    }),
    new FaviconsWebpackPlugin({
      logo: __dirname + '/password-storage.svg',
      prefix: 'icons-[hash]/',
      // persistentCache: true,
      inject: true,
      background: '#fff',
      title: title,
      display: "standalone",
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        favicons: true,
        firefox: true,
        windows: { background: '#da532c' },
        yandex: true,
      }
    }),
  ]
};
