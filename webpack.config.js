const path = require('path');

module.exports = {
  mode: 'development',
  devServer: {
    open: true,
    openPage: 'index.html',
    contentBase: path.join(__dirname, 'docs'),
    watchContentBase: true,
    port: 8080,
  },
  entry: { app: './src/js/index.js' },
  output: {
    path: path.join(__dirname, 'docs'),
    publicPath: '/js/',
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  devtool: 'inline-source-map',
};
