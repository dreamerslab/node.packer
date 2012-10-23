# node.packer

An assets combine and minify tool



## Description

`node.packer` is a simple tool to combine and minify css and javascript files.



## Requires

    node >= 0.4.x



## Installation

    npm install node.packer



## Options

> log

    description: whether to log errors
    data type: boolean
    default value: false
    possible value: true | false

> minify

    description: whether to minify output file
    data type: boolean
    default value: false
    possible value: true | false

> uglify

    description: whether to uglify javascript variables
    data type: boolean
    default value: true
    possible value: true | false

> input

    description: files to be combined
    data type: string
    default value: undefined
    possible value: '/path/to/the/css.css' ...

> output

    description: path to save the combined file
    data type: string
    default value: undefined
    possible value: '/path/to/the/js.min.js' ...

> callback

    description: callback function
    data type: function
    default value: undefined
    possible value: function ( err, stdout, stderr ){ ... }

## Usage

> Example

    var packer = require( 'node.packer' ),
        path   = '~/Desktop/packer/';

    packer({
      log : true,
      input : [
        path + 'dojo.js',
        path + 'jquery.js'
      ],
      output : path + 'pack.min.js',
      callback: function ( err, code ){
        err && console.log( err );
      }
    });



## License

(The MIT License)

Copyright (c) 2011 dreamerslab &lt;ben@dreamerslab.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
