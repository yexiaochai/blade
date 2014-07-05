module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    curl: {
      js: {
        src: 'http://cdnjs.cloudflare.com/ajax/libs/labjs/2.0.3/LAB.min.js',
        dest: 'actual/file.js'
      },
      zip: {
        src: 'https://github.com/twitter/bootstrap/blob/91b92f9dd09c1794d02c6157daba5405d8f09e39/assets/bootstrap.zip?raw=true',
        dest: 'actual/file.zip'
      },
      get: {
        src: {
          url: 'http://localhost:4000/get.txt',
          method: 'GET',
          qs: {
            hello: 'world'
          }
        },
        dest: 'actual/get.txt'
      },
      post: {
        src: {
          url: 'http://localhost:4000/post.txt',
          method: 'POST',
          form: {
            hello: 'world'
          }
        },
        dest: 'actual/post.txt'
      },
      nonExistingDomain: {
        src: 'http://nonexistent--foo--domain',
        dest: 'actual/nonexistent-domain'
      },
      nonExistingFile: {
        src: 'https://github.com/nonexistent--foo--file',
        dest: 'actual/nonexistent-file'
      }
    },
    'curl-dir': {
      multi: {
        src: [
          'http://cdnjs.cloudflare.com/ajax/libs/labjs/2.0.3/LAB.min.js',
          'http://cdnjs.cloudflare.com/ajax/libs/cookiejar/0.5/cookiejar.js'
        ],
        dest: 'actual/multi'
      },
      braceExpansion: {
        src: [
          'http://cdnjs.cloudflare.com/ajax/libs/{labjs/2.0.3/LAB.min,cookiejar/0.5/cookiejar}.js'
        ],
        dest: 'actual/braceExpansion'
      },
      router: {
        src: [
          'http://cdnjs.cloudflare.com/ajax/libs/labjs/2.0.3/LAB.min.js',
          'http://cdnjs.cloudflare.com/ajax/libs/cookiejar/0.5/cookiejar.js'
        ],
        router: function curlDirRouter (url) {
          return url.replace('http://cdnjs.cloudflare.com/', '');
        },
        dest: 'actual/router'
      },
      post: {
        src: [{
          url: 'http://localhost:4000/post.txt',
          method: 'POST',
          form: {
            hello: 'world'
          }
        }],
        dest: 'actual/multiPost'
      }
    }
  });

  // Load local tasks.
  grunt.loadTasks('../tasks');

  // Load grunt contrib clean (chdir for 0.4)
  process.chdir('..');
  grunt.loadNpmTasks('grunt-contrib-clean');
  process.chdir(__dirname);

  // Run project tasks
  grunt.registerTask('default', 'clean curl curl-dir');
};
