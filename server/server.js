// ES6 Transpiler
//enables ES6 ('import'.. etc) in Node
require('babel-core/register');
require('babel-polyfill');
if (process.env.NODE_ENV === 'production') {
  require('./server.prod')
} else {
  require('./server.dev');
}
