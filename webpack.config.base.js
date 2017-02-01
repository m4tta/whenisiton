const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'public/');
const APP_DIR = path.resolve(__dirname, 'client/');

const config = {
  entry: [],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: APP_DIR,
        loaders: ['react-hot-loader' ,'babel-loader']
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            query: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                optimizationLevel: 7,
              },
              gifsicle: {
                interlaced: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            }
          }
        ]
      }
    ]
  }
};

module.exports = config;
