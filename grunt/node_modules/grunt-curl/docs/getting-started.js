module.exports = function (grunt) {
  // Configure `curl` with URLs
  // If you would like to download multiple files
  // to the same directory, there is `curl-dir`
  grunt.initConfig({
    curl: {
      'location/to/download/github.html': 'http://github.com/',
    }
  });

  // Load in `grunt-curl`
  grunt.loadTasks('../tasks');
};
