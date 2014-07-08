// Load in dependencies
var expect = require('chai').expect;
var fsUtils = require('./utils/fs');
var gruntUtils = require('./utils/grunt');
var serverUtils = require('./utils/server');

// curl-dir tests
describe('grunt curl-dir', function () {
  describe('downloading multiple files', function () {
    gruntUtils.runTask('curl-dir:multi');

    describe('the first file', function () {
      fsUtils.readExpectedFile('multi/LAB.min.js', 'utf8');
      fsUtils.readActualFile('multi/LAB.min.js', 'utf8');

      it('is successfully downloaded', function () {
        expect(this.err).to.equal(null);
        expect(this.actualContent).to.equal(this.expectedContent);
      });
    });

    describe('the second file', function () {
      fsUtils.readExpectedFile('multi/cookiejar.js', 'utf8');
      fsUtils.readActualFile('multi/cookiejar.js', 'utf8');

      it('is successfully downloaded', function () {
        expect(this.err).to.equal(null);
        expect(this.actualContent).to.equal(this.expectedContent);
      });
    });
  });

  describe('downloading brace expanded files', function () {
    gruntUtils.runTask('curl-dir:braceExpansion');

    describe('the first file', function () {
      fsUtils.readExpectedFile('braceExpansion/LAB.min.js', 'utf8');
      fsUtils.readActualFile('braceExpansion/LAB.min.js', 'utf8');

      it('is successfully downloaded', function () {
        expect(this.err).to.equal(null);
        expect(this.actualContent).to.equal(this.expectedContent);
      });
    });

    describe('the second file', function () {
      fsUtils.readExpectedFile('braceExpansion/cookiejar.js', 'utf8');
      fsUtils.readActualFile('braceExpansion/cookiejar.js', 'utf8');

      it('is successfully downloaded', function () {
        expect(this.err).to.equal(null);
        expect(this.actualContent).to.equal(this.expectedContent);
      });
    });
  });

  describe('using a custom router', function () {
    gruntUtils.runTask('curl-dir:router');

    describe('the first file', function () {
      fsUtils.readExpectedFile('router/ajax/libs/labjs/2.0.3/LAB.min.js', 'utf8');
      fsUtils.readActualFile('router/ajax/libs/labjs/2.0.3/LAB.min.js', 'utf8');

      it('is successfully downloaded', function () {
        expect(this.err).to.equal(null);
        expect(this.actualContent).to.equal(this.expectedContent);
      });
    });

    describe('the second file', function () {
      fsUtils.readExpectedFile('router/ajax/libs/cookiejar/0.5/cookiejar.js', 'utf8');
      fsUtils.readActualFile('router/ajax/libs/cookiejar/0.5/cookiejar.js', 'utf8');

      it('is successfully downloaded', function () {
        expect(this.err).to.equal(null);
        expect(this.actualContent).to.equal(this.expectedContent);
      });
    });
  });

  describe('using POST', function () {
    serverUtils.runPostServer();
    gruntUtils.runTask('curl-dir:post');
    fsUtils.readExpectedFile('multiPost/post.txt', 'utf8');
    fsUtils.readActualFile('multiPost/post.txt', 'utf8');

    it('is successful', function () {
      expect(this.err).to.equal(null);
      expect(this.actualContent).to.equal(this.expectedContent);
    });
  });
});
