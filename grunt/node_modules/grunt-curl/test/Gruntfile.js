module.exports = function (grunt) {
  // Load in legacy config
  require('./grunt')(grunt);

  // Run project tasks
  grunt.registerTask('default', ['clean', 'curl', 'curl-dir']);
};
