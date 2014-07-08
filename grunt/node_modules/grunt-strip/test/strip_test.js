"use strict";

var grunt = require('grunt');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

var helpers = require('../tasks/helpers');

function LoggingError() {
  Error.apply(this, arguments);
}

LoggingError.prototype = new Error();
LoggingError.prototype.constructor = LoggingError;
LoggingError.prototype.name = 'LoggingError';

var read = grunt.file.read;
var apiName = 'iog';

function run(string) {
  if (typeof string === 'undefined' || string === 'undefined') throw new Error('Undefined string passed in');
  "use strict";
  var api = [
    'debug',
    'info',
    'warn',
    'error',
    'trace'
  ];

  global[apiName] = {};

  api.forEach(function(method){
    global[apiName][method] = function(){throw new LoggingError(method);};
  });

  return function(){ eval(string); };
}

exports['strip-logging'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  inline : function(test) {

    var actualDir = 'tmp/inline/',
      expectedDir = 'test/expected/';

    var files = [
      'all_api_methods.js',
      'basic.js',
      'nodes_in_blocks.js',
      'other_object.js',
    ];

    test.expect(files.length);

    files.forEach(function(file){
      var actual = grunt.file.read(actualDir + file);
      var expected = grunt.file.read(expectedDir + file);
      test.equals(actual,expected, file + " should be the same");
    });

    test.done();
  },
  single : function(test) {

    var actualDir = 'tmp/',
        expectedDir = 'test/expected/';

    var files = [
      'all_api_methods.js',
    ];

    test.expect(files.length);

    files.forEach(function(file){
      var actual = grunt.file.read(actualDir + file);
      var expected = grunt.file.read(expectedDir + file);
      test.equals(actual,expected, file + " should be the same");
    });

    test.done();
  },
  'helper': function(test) {
    var file;
    test.expect(4 * 2);
    file = 'test/fixtures/basic.js';
    test.throws(run(read(file)),LoggingError,'Original should throw error');
    test.doesNotThrow(run(helpers.stripNodes(apiName,read(file))), 'Stripped should not throw error');

    file = 'test/fixtures/other_object.js';
    test.throws(run(read(file)),LoggingError,'Original should throw error');
    test.doesNotThrow(run(helpers.stripNodes(apiName,read(file))), 'Stripped should not throw error');

    file = 'test/fixtures/all_api_methods.js';
    test.throws(run(read(file)),LoggingError,'Original should throw error');
    test.doesNotThrow(run(helpers.stripNodes(apiName,read(file))), 'Stripped should not throw error');

    file = 'test/fixtures/nodes_in_blocks.js';
    test.throws(run(read(file)),LoggingError,'Original should throw error');
    test.doesNotThrow(run(helpers.stripNodes(apiName,read(file))), 'Stripped should not throw error');

    test.done();
  }
};


