var packer = require('../index');
var src    = __dirname + '/src/';
var target = __dirname + '/assets/';

packer({
  log: true,
  type: 'js',
  input: [
    src + 'dojo.js',
    src + 'jquery.js',
    src + 'prototype.js'
  ],
  output: target + 'pack.min.js'
});

packer({
  log: true,
  minify: true,
  type: 'css',
  input: [
    src + 'reset.css',
    src + 'reset-html5.css'
  ],
  output: target + 'pack.min.css'
});
