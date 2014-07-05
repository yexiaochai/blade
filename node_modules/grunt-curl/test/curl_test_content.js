// Load in dependencies
var fs = require('fs'),
    cp = require('child_process'),
    exec = cp.exec,
    chai = require('chai'),
    expect = chai.expect,
    express = require('express');

module.exports = {
  // Utilities
  'execute task': function (done) {
    // Relocate to test directory
    process.chdir(__dirname);

    // Execute the cmd and task combination
    var that = this;
    this.timeout(5000);
    exec(this.cmd + this.task, function (err, stdout, stderr) {
      // Save results for later
      that.err = err;
      that.stdout = stdout;
      that.stderr = stderr;

      // Callback
      done();
    });
  },
  'postServer': {
    before: function () {
      this.server = express();
      this.server.post('/post.txt', express.urlencoded(), function (req, res) {
        res.send(req.body);
      });
      this._server = this.server.listen(4000);
    },
    after: function (done) {
      this._server.close(done);
    }
  },

  // Cleaning tasks
  'A clean test directory': [function () {
    this.cmd = 'grunt clean';
    this.task = '';
  }, 'execute task'],
  'is clean': function () {},

  // Grunt commands
  'grunt curl': function () {
    this.cmd = 'grunt curl:';
  },
  'grunt curl-dir': function () {
    this.cmd = 'grunt curl-dir:';
  },

  // curl tasks
  'downloading a js (utf16) file': [function () {
    this.task = 'js';
    this.filenames = ['file.js'];
  }, 'execute task'],
  'downloading a zip (binary) file': [function () {
    this.task = 'zip';
    this.filenames = ['file.zip'];
  }, 'execute task'],
  'downloading a POST file': [function () {
      this.task = 'post';
      this.filenames = ['post.txt'];
  }, 'postServer', 'execute task'],
  'downloading a file from an invalid domain': [function () {
    this.task = 'nonExistingDomain';
    this.filenames = ['nonexistent-domain'];
  }, 'execute task'],
  'downloading a nonexistant file': [function () {
    this.task = 'nonExistingFile';
    this.filenames = ['nonexistent-file'];
  }, 'execute task'],

  // curl-dir tasks
  'downloading multiple files': [function () {
    this.task = 'multi';
    this.filenames = ['multi/LAB.min.js', 'multi/cookiejar.js'];
  }, 'execute task'],
  'downloading brace expanded files':  [function () {
    this.task = 'braceExpansion';
    this.filenames = ['braceExpansion/LAB.min.js', 'braceExpansion/cookiejar.js'];
  }, 'execute task'],
  'using a custom router': [function () {
    this.task = 'router';
    this.filenames = ['router/ajax/libs/labjs/2.0.3/LAB.min.js', 'router/ajax/libs/cookiejar/0.5/cookiejar.js'];
  }, 'execute task'],
  'using POST': [function () {
    this.task = 'post';
    this.filenames = ['multiPost/post.txt'];
  },  'postServer', 'execute task'],

  // curl and curl-dir results
  'is successful':  function () {
    // Assert no error
    expect(this.err).to.equal(null);

    // and file(s) match as expected
    this.filenames.forEach(function assertFilenames (filename) {
      var expectedContent = fs.readFileSync('expected/' + filename, 'binary'),
          actualContent = fs.readFileSync('actual/' + filename, 'binary');
      expect(actualContent).to.equal(expectedContent);
    });
  },
  'throws an error':  function () {
    expect(this.err).to.not.equal(null);
  },
  'does not create the file':  function () {
    // Loop over the files
    this.filenames.forEach(function lookupFile(filename) {
      // Grab the file
      var filepath = 'actual/' + filename;
      try {
        fs.statSync(filepath);
        throw new Error('File "' + filepath + '" was properly located');
      } catch (e) {
        expect(e).to.have.property('code', 'ENOENT');
      }
    });
  }
};