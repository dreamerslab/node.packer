/*!
 * node.packer
 * Copyright(c) 2011 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * An assets combine and minify tool.
 */
var fs   = require( 'fs' );
var exec = require( 'child_process' ).exec;

var uid = function( len ){
  var str    = "";
  var source = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var i      = len;

  for( ; i-- ; ){
    str += source.charAt( Math.floor( Math.random() * source.length ));
  }

  return str;
};

var packer = function ( options ){
  var logger = options && options.log === true ?
    function ( args ){
      console.log( args );
    } : function (){};

  // make sure some required options exist
  var args = [ 'type', 'input', 'output' ];

  if( !options ){
    return logger( '[packer] options is not defined' );
  }

  // do not use forEach because it can not be stopped
  var i = args.length;

  for( ; i--; ){
    if( !options[ args[ i ]]){
      return logger( '[packer] "options.' + args[ i ] + '" is not defined' );
    }
  }

  // make sure files to be an array
  var files = Array.isArray( options.input ) ?
    options.input : [ options.input ];

  // save all input files to a tmp file
  var tmp = '';
  var j   = 0;
  var k   = files.length;

  for( ; j < k; j++ ){
    if( fs.existsSync( files[ j ])){
      tmp += fs.readFileSync( files[ j ]) + '\n';
    }else{
      return logger( '[packer] file "' + files[ j ] + '" does not exist' );
    }
  }

  var output = __dirname + uid( 32 ) + '.' + options.type;

  fs.writeFileSync( output, tmp );

  // minify
  var uglify = options.uglify === false ?
    ' --nomunge' : '';

  var command = options.minify === true ?
    'java -jar ' + __dirname + '/yuicompressor-2.4.7.jar ' + output +
    ' -o ' + options.output + uglify + '&& rm ' + output:
    'mv ' + output + ' ' + options.output;

  exec( command, function ( err, stdout, stderr ){
    options.callback && options.callback.call( this, err, stdout, stderr );
  });

};

/**
 * @public
 */
Flow.version = JSON.parse( fs.readFileSync( __dirname + '/../package.json', 'utf8' )).version;

/**
 * @exports Flow as node.flow
 */
module.exports = packer;
