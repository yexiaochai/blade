// Load in dependencies
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var async = require('async');
var gruntRetro = require('grunt-retro');
var request = require('request');

// Define our tasks
module.exports = function (grunt) {
  // Load in grunt-retro
  grunt = gruntRetro(grunt);

  // Define a task for single files
  grunt.registerMultiTask('curl', 'Download files from the internet via grunt.', function () {
    // Collect the filepaths we need
    var src = this.file.src;
    var dest = this.file.dest;
    var done = this.async();

    // If we have received an array, condense it
    // DEV: If there are multiple files, we cannot concatenate them since that requires buffering
    // DEV: which creates issues with large files. As a result, do not allow multiple files.
    var srcFile = src;
    var srcFiles = srcFile;
    if (Array.isArray(srcFiles)) {
      // If there were no files found, be informative
      if (srcFiles.length === 0) {
        grunt.fail.warn('No source files were specified. Stopping `grunt-curl` early.');
        return done();
      // Otherwise, if there were too many files, complain and leave
      } else if (srcFiles.length > 1) {
        grunt.fail.warn('Too many source files received. Expected: 1, Actual: ' + srcFiles.length + '. Stopping `grunt-curl` early.');
        return done();
      }

      // Collapse first element
      srcFile = srcFiles[0];
    }

    // Asynchronously fetch the file
    grunt.helper('curl', {
      src: srcFile,
      dest: dest
    }, function handleCurlComplete (err) {
      // If there is an error, fail
      if (err) {
        grunt.fail.warn(err);
        return done();
      }

      // Otherwise, print a success message.
      grunt.log.writeln('File "' + dest + '" created.');

      // Callback
      done();
    });
  });

  // Define a task for multiple files
  grunt.registerMultiTask('curl-dir', 'Download collections of files from the internet via grunt.', function () {
    // Collect the filepaths we need
    var src = this.file.src;
    var dest = this.file.dest;
    var done = this.async();

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

    // Determine the destinations
    var router = this.data.router || function defaultRouter (filepath) {
      if (typeof filepath !== 'string') {
        filepath = filepath.url || filepath.uri;
      }
      return path.basename(filepath);
    };
    var fileInfos = srcFiles.map(function getDest (srcFile, i) {
      // Route the file, append it to dest, and return
      var filepath = router(srcFile),
          retStr = path.join(dest, filepath);
      return {
        src: srcFile,
        dest: retStr
      };
    });

    // Asynchronously fetch the files in parallel
    async.map(fileInfos, grunt.helper.bind(grunt, 'curl'), function handleCurlResult (err) {
      // If there is an error, fail
      if (err) {
        grunt.fail.warn(err);
        return done();
      }

      // Otherwise, print a success message.
      var destArr = _.pluck(fileInfos, 'dest');
      grunt.log.writeln('Files "' + destArr.join('", "') + '" created.');

      // Callback
      done();
    });
  });

  // Register our curl helper
  grunt.registerHelper('curl', function (info, cb) {
    // Default to a binary request
    var options = info.src;
    var dest = info.dest;

    // Request the url
    var req = request(options);

    // On error, callback
    req.on('error', cb);

    // On response, callback for writing out the stream
    req.on('response', function handleResponse (res) {
      // Assert the statusCode was good
      var statusCode = res.statusCode;
      if (statusCode < 200 || statusCode >= 300) {
        return cb(new Error('Fetching ' + JSON.stringify(options) + ' failed with HTTP status code ' + statusCode));
      }

      // Otherwise, write out the content
      var destdir = path.dirname(dest);
      grunt.file.mkdir(destdir);
      var writeStream = fs.createWriteStream(dest);
      res.pipe(writeStream);

      // When the stream errors or completes, exit
      writeStream.on('error', cb);
      writeStream.on('close', cb);
    });
  });
};
