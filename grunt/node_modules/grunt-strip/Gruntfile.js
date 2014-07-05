'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    nodeunit: {
      files: ['test/**/*test.js']
    },
    clean : {
      tmp : ['tmp']
    },
    copy: {
      all : {
        files: [
          {expand: true, src: ['**'], dest: 'tmp/inline/', cwd: 'test/fixtures/'}
        ]
      }
    },
    strip : {
      options : {
        nodes : ['iog', 'console.log']
      },
      all_api_methods : {
        src : 'test/fixtures/all_api_methods.js',
        dest : 'tmp/all_api_methods.js'
      },
      inline : {
        src : ['tmp/inline/*.js'],
        options : {
          inline : true
        }
      }
    },
    jshint: {
      options : {
        jshintrc : './.jshintrc'
      },
      all : ['Gruntfile.js', 'tasks/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', ['jshint','clean','copy','strip','nodeunit']);

};
