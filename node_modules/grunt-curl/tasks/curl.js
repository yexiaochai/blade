/*
 * grunt-curl
 * https://github.com/twolfson/grunt-curl
 *
 * Copyright (c) 2013 Todd Wolfson
 * Licensed under the MIT license.
 */

var fs = require('fs'),
    path = require('path'),
    gruntRetro = require('grunt-retro'),
    request = require('request'),
    async = require('async'),
    _ = require('lodash');
module.exports = function (grunt) {
  // Load in grunt-retro
  grunt = gruntRetro(grunt);

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/gruntjs/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('curl', 'Download files from the internet via grunt.', function () {
    // Collect the filepaths we need
    var file = this.file,
        data = this.data,
        src = file.src,
        dest = file.dest,
        done = this.async(),
        that = this;

    // Upcast the srcFiles to an array
    var srcFiles = src;
    if (!Array.isArray(srcFiles)) {
      srcFiles = [src];
    }

    // Asynchronously fetch the files in parallel
    async.map(srcFiles, grunt.helper.bind(grunt, 'curl'), curlResultFn);

    function curlResultFn(err, files) {
      // If there is an error, fail
      if (err) {
        grunt.fail.warn(err);
      }

      // Concatenate the srcFiles, process the blob through our helper,
      var separator = data.separator || '\n',
          content = files.join(separator);

      // Write out the content
      var destDir = path.dirname(dest);
      grunt.file.mkdir(destDir);
      fs.writeFileSync(dest, content, 'binary');

      // Otherwise, print a success message.
      grunt.log.writeln('File "' + dest + '" created.');

      // Callback
      done();
    }
  });

  grunt.registerMultiTask('curl-dir', 'Download collections of files from the internet via grunt.', function () {
    // Collect the filepaths we need
    var file = this.file,
        src = file.src,
        dest = file.dest,
        data = this.data,
        router = data.router || function defaultRouter (filepath) {
          if (typeof filepath !== 'string') {
            filepath = filepath.url || filepath.uri;
          }
          return path.basename(filepath);
        },
        done = this.async(),
        that = this;

    // Upcast the srcFiles to an array
    var srcFiles = src;
    if (!Array.isArray(srcFiles)) {
      srcFiles = [src];
    }

    // Iterate over the array and expand the braces
    var minimatch = grunt.file.glob.minimatch,
        braceExpand = minimatch.braceExpand;
    srcFiles = srcFiles.reduce(function expandSrcFiles (retArr, srcFile) {
      var srcFileArr = typeof srcFile === 'string' ? braceExpand(srcFile) : [srcFile];
      retArr = retArr.concat(srcFileArr);
      return retArr;
    }, []);

    // Asynchronously fetch the files in parallel
    async.map(srcFiles, grunt.helper.bind(grunt, 'curl'), curlResultFn);

    function curlResultFn(err, files) {
      // If there is an error, fail
      if (err) {
        grunt.fail.warn(err);
      }

      // Determine the destinations
      var destArr = srcFiles.map(function getDest (srcFile) {
            // Route the file, append it to dest, and return
            var filepath = router(srcFile),
                retStr = path.join(dest, filepath);
            return retStr;
          });

      // Iterate over each of the files
      files.forEach(function curlWriteFiles (content, i) {
        // Write out the content
        var destPath = destArr[i],
            destDir = path.dirname(destPath);
        grunt.file.mkdir(destDir);
        fs.writeFileSync(destPath, content, 'binary');
      });

      // Otherwise, print a success message.
      grunt.log.writeln('Files "' + destArr.join('", "') + '" created.');

      // Callback
      done();
    }
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  // Register our curl helper
  grunt.registerHelper('curl', function (options, cb) {
    // Default to a binary request
    if (typeof options === 'string') {
      options = {'url': options};
    }
    var params = _.extend({'encoding': 'binary'}, options);

    // Request the url
    request(params, function (err, res, body) {
      // If there was response, assert the statusCode was good
      if (res) {
        var statusCode = res.statusCode;
        if (statusCode < 200 || statusCode >= 300) {
          err = new Error('Fetching ' + JSON.stringify(options) + ' failed with HTTP status code ' + statusCode);
        }
      }

      // Callback with the error and body
      cb(err, body);
    });
  });

};