const webpack = require('webpack');
const path = require('path');

const validate = require('webpack-validator');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.config.base');

const BUILD_DIR = path.resolve(__dirname, 'public/');
const APP_DIR = path.resolve(__dirname, 'client/');

const config = validate(merge(baseConfig, {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    'whatwg-fetch',
    path.resolve(APP_DIR, 'app.js')
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: APP_DIR,
        loaders: ['react-hot' ,'babel']
      }
    ]
  }
}));

module.exports = config;
