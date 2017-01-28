const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'public/');
const APP_DIR = path.resolve(__dirname, 'client/');

const config = {
  devtool: 'source-map',
  entry: [
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
    new ExtractTextPlugin('/css/bundle.css', {
      allChunks: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: APP_DIR,
        loader: 'babel'
      }
    ]
  }
};

module.exports = config;
