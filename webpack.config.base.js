const webpack = require('webpack');
const path = require('path');

const validate = require('webpack-validator');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.config.base');

const BUILD_DIR = path.resolve(__dirname, 'public/');
const APP_DIR = path.resolve(__dirname, 'client/');

const config = validate(merge(baseConfig, {
  entry: [],
  output: {},
  plugins: [],
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  }
}));

module.exports = config;
