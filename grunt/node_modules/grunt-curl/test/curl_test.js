// Load in dependencies
var expect = require('chai').expect;
var fsUtils = require('./utils/fs');
var gruntUtils = require('./utils/grunt');
var serverUtils = require('./utils/server');

// curl tests
describe('grunt curl', function () {
  describe('downloading a GET file', function () {
    serverUtils.runGetServer();
    gruntUtils.runTask('curl:get');
    fsUtils.readExpectedFile('get.txt', 'utf8');
    fsUtils.readActualFile('get.txt', 'utf8');

    it('is successful', function () {
      expect(this.err).to.equal(null);
      expect(this.actualContent).to.equal(this.expectedContent);
    });
  });

  describe('downloading a POST file', function () {
    serverUtils.runPostServer();
    gruntUtils.runTask('curl:post');
    fsUtils.readExpectedFile('post.txt', 'utf8');
    fsUtils.readActualFile('post.txt', 'utf8');

    it('is successful', function () {
      expect(this.err).to.equal(null);
      expect(this.actualContent).to.equal(this.expectedContent);
    });
  });

  describe('downloading a utf8 file (js)', function () {
    gruntUtils.runTask('curl:js');
    fsUtils.readExpectedFile('file.js', 'utf8');
    fsUtils.readActualFile('file.js', 'utf8');

    it('is successful', function () {
      expect(this.err).to.equal(null);
      expect(this.actualContent).to.equal(this.expectedContent);
    });
  });

  describe('downloading a binary file (zip)', function () {
    gruntUtils.runTask('curl:zip');
    fsUtils.readExpectedFile('file.zip', 'binary');
    fsUtils.readActualFile('file.zip', 'binary');

    it('is successful', function () {
      expect(this.err).to.equal(null);
      expect(this.actualContent).to.equal(this.expectedContent);
    });
  });

  describe('downloading a file from an invalid domain', function () {
    gruntUtils.runTask('curl:nonExistingDomain');
    fsUtils.exists('actual/nonexistent-domain');

    it('throws an error', function () {
      expect(this.err).to.not.equal(null);
    });
    it('does not create the file', function () {
      expect(this.fileExiss).to.not.equal(false);

    });
  });

  describe('downloading a nonexistant file', function () {
    gruntUtils.runTask('curl:nonExistingFile');
    fsUtils.exists('actual/nonexistent-file');

    it('throws an error', function () {
      expect(this.err).to.not.equal(null);
    });
    it('does not create the file', function () {
      expect(this.fileExiss).to.not.equal(false);

    });
  });
});
