const webpack = require('webpack');
const path = require('path');

const merge = require('webpack-merge');

const baseConfig = require('./webpack.config.base');

const BUILD_DIR = path.resolve(__dirname, 'public/');
const APP_DIR = path.resolve(__dirname, 'client/');

const config = merge(baseConfig, {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    'whatwg-fetch',
    path.resolve(APP_DIR, 'app.js')
  ],
  output: {},
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
});

module.exports = config;
