const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const merge = require('webpack-merge');

const baseConfig = require('./webpack.config.base');

const APP_DIR = path.resolve(__dirname, 'client/');

const config = merge(baseConfig, {
  entry: [
    'whatwg-fetch',
    path.resolve(APP_DIR, 'app.js')
  ],
  output: {},
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': "'production'"
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new ExtractTextPlugin({
      filename: '/css/bundle.css',
      allChunks: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: APP_DIR,
        use: ['babel-loader']
      },
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  }
});

module.exports = config;
