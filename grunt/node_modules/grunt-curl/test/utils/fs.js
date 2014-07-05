var fs = require('fs');

// Helper to load file into mocha's `this` context
exports._readFile = function (key, path, encoding) {
  before(function loadFile (done) {
    var that = this;
    fs.readFile(path, encoding, function (err, content) {
      that[key] = content;
      done(err);
    });
  });
  after(function cleanupFile () {
    delete this[key];
  });
};

exports.readExpectedFile = function (path, encoding) {
  exports._readFile('expectedContent', 'expected/' + path, encoding);
};

exports.readActualFile = function (path, encoding) {
  exports._readFile('actualContent', 'actual/' + path, encoding);
};

// Helper to determine file existence
exports.exists = function (path) {
  before(function loadFile (done) {
    var that = this;
    fs.exists(path, function (exists) {
      that.fileExists = exists;
      done();
    });
  });
  after(function cleanupFile () {
    delete this.fileExists;
  });
};
