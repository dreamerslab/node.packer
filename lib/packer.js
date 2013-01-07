/*!
 * node.packer
 * Copyright(c) 2011 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * An assets combine and minify tool.
 */

/**
 * Module dependencies.
 * @private
 */
var fs      = require( 'fs' );
var css_min = require( 'clean-css' );
var js_min  = require( 'uglify-js' );

var concat = function ( files ){
  var out = '';
  var i   = 0;
  var j   = files.length;
  var file;

  for( ; i < j; i++ ){

    file = files[ i ];

    if( fs.existsSync( file )){
      out += fs.readFileSync( file ) + '\n';
    }else{
      throw new Error( '[packer] file "' + file + '" does not exist' );
    }
  }

  return out;
};

var packer = function ( opt ){
  var logger = opt && opt.log === true ?
    function ( args ){
      console.log( args );
    } : function (){};

  // make sure some required options exist
  var args = [ 'input', 'output' ];

  if( !opt ){
    return logger( '[packer] options is not defined' );
  }

  // do not use forEach because it can not be stopped
  var i = args.length;

  for( ; i--; ){
    if( !opt[ args[ i ]]){
      return logger( '[packer] "options.' + args[ i ] + '" is not defined' );
    }
  }

  // make sure files to be an array
  var files = Array.isArray( opt.input ) ?
    opt.input : [ opt.input ];

  if( !files.length ){
    opt.callback && opt.callback.call( this, null, null );

    return;
  }

  var format = files[ 0 ].trim().match( /\.(js|css)$/ );

  if( !format ){
    return logger( '[packer] only takes css or js as input files' );
  }

  format = format[ 0 ].trim();

  try{
    var output = concat( files );

    if( opt.minify === true ){
      if( format === '.css' ){

        output = css_min.process( output );
      }else{
        var ast = js_min.parse( output );

        ast.figure_out_scope();
        ast.compute_char_frequency();

        if( opt.uglify ) ast.mangle_names();

        output = ast.print_to_string();
      }
    }

    fs.writeFileSync( opt.output, output );
  }catch( err ){
    opt.callback && opt.callback.call( this, err );
  }

  opt.callback && opt.callback.call( this, null, output );
};



/**
 * @public
 */
packer.version = JSON.parse( fs.readFileSync( __dirname + '/../package.json', 'utf8' )).version;

/**
 * Exports module.
 */
module.exports = packer;
