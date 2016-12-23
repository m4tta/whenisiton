const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'public/');
const APP_DIR = path.resolve(__dirname, 'client/');

const config = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(APP_DIR, 'app.js')
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: APP_DIR,
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      }
    ]
  }
};

module.exports = config;
