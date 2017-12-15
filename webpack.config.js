module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/public/assets/',
    publicPath: '/assets/',
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader?modules"
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
  }
};
