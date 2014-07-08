/*
 * grunt-strip
 * https://github.com/joverson/grunt-strip
 *
 * Copyright (c) 2012 Jarrod Overson
 * Licensed under the MIT license.
 */

'use strict';

var helpers = require('./helpers');

module.exports = function(grunt) {

  grunt.registerMultiTask('strip', 'Strip console and iog logging messages', function() {
    var nodes = ['console'];

    var options = this.options();

    if (options.nodes) {
      nodes = options.nodes instanceof Array  ? options.nodes : [options.nodes];
    }

    this.files.forEach(function(fileObj){
      if (!fileObj.dest) {
        if (!options.inline) {
          grunt.log.error('WARNING : POTENTIAL CODE LOSS.'.yellow);
          grunt.log.error('You must specify "inline : true" when using the "files" configuration.');
          grunt.log.errorlns(
            'This WILL REWRITE FILES WITHOUT MAKING BACKUPS. Make sure your ' +
              'code is checked in or you are configured to operate on a copied directory.'
          );
          return;
        }
        fileObj.src.forEach(function(file) {
          stripSource(file,file,nodes);
        });
      } else {
        var file = fileObj.src[0],
          dest = fileObj.dest;
        stripSource(file,dest,nodes);
      }
    });
  });

  function stripSource(file,dest, nodes) {
    var src = grunt.file.read(file),
      output = stripNodes(src,nodes);

    return grunt.file.write(dest,output);
  }

  function stripNodes(src,nodes) {
    var output = src;
    nodes.forEach(function(node){
      output = helpers.stripNodes(node, output);
    });
    return output;
  }

};
