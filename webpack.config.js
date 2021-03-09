var HtmlWebpackPlugin = require('html-webpack-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');

var title = 'PasswordStorage Web';

module.exports = {
  entry: './src/index.js',
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
              modules: {
                mode: 'local',
                exportLocalsConvention: 'dashesOnly',
              },
            },
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
      prefix: 'icons-[fullhash]/',
      inject: true,
      background: '#fff',
      title: title,
      display: "standalone",
      online: false,
      logging: true,
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
  ],
  performance: {
    maxAssetSize: 1_000_000,
    maxEntrypointSize: 1_000_000,
  },
  devServer: {
    contentBase: __dirname + '/public/',
  }
};
