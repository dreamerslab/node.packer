/*!
 * node.acker
 * Copyright(c) 2011 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview 
 * An assets combine and minify tool.
 */

var fs, path, exec, packer;

fs   = require('fs');
path = require('path');
exec = require('child_process').exec;

packer = function(options) {
  var logger, args, i, files, j, k, tmp, output, command, uglify;
  
  logger = options && options.log === true ?
    function(args) {
      console.log(args);
    } :
    function() {};
  
  // make sure some required options exist
  args = ['type', 'input', 'output'];
  
  if(!options){
    logger('packer: options is not defined');
    return;
  }
  
  // do not use forEach because if can not be stopped
  for (i = args.length; i--;) {
    if(!options[args[i]]){
      logger('packer: "options.' + args[i] + '" is not defined');
      return;
    }
  }
  
  // make sure files to be an array
  files = {}.toString.call(options.input) === '[object Array]' ?
    options.input : [options.input];
  
  // save all input files to a tmp file
  tmp = '';
  for (j = 0, k = files.length; j < k; j++) {
    if (path.existsSync(files[j])) {
      tmp += fs.readFileSync(files[j]) + '\n';
    }else{
      logger('packer: file "' + files[j] + '" does not exist');
      return;
    }
  }
  
  output = __dirname + '/tmp.' + options.type;
  
  fs.writeFileSync(output, tmp);
  
  // minify
  uglify = options.uglify === false ?
    ' --nomunge' : '';
    
  command = options.minify === true ?
    'java -jar ' + __dirname + '/yuicompressor-2.4.7.jar ' + output + ' -o ' + options.output + uglify:
    'cp ' + output + ' ' + options.output;
  
  exec(command, function (err, stdout, stderr) {
    options.callback && options.callback.call(this, err, stdout, stderr);
  });
};

packer.version = '0.0.3';

module.exports = packer;
