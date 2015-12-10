module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/public/assets/',
    publicPath: '/assets/',
    filename: 'index.js'
  },
  module: {
    loaders: [
      { test: /\.js$/,  loader: "babel-loader", exclude: /node_modules/, query: { presets: ['es2015', 'react'], plugins: ['transform-runtime'] } },
      { test: /\.css$/, loader: "style-loader!css-loader?modules" }
    ],
    preLoaders: [
      { test: /\.js$/, loader: "eslint-loader", exclude: /node_modules|tests/ }
    ]
  },
  eslint: {
    configPath: __dirname + ".eslintrc"
  }
};

