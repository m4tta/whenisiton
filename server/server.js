const path = require('path');
const express = require('express');

const app = express();

const isProduction = process.env.NODE_ENV === 'production';
const PORT = isProduction ? process.env.PORT : 3000;

if (!isProduction) {
  const webpack = require('webpack');
  const config = require('../webpack.config.dev');
  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use('/public', express.static(path.resolve(__dirname, '../public')))

let indexFile = isProduction ? path.resolve(__dirname, '../public/index.prod.html')
                             : path.resolve(__dirname, '../public/index.dev.html');

app.get('/', function(req, res) {
  res.sendFile(indexFile);
});

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
