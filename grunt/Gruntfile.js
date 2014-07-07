/**
 * Created by shbzhang on 13-11-21.
 */
module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    config: {
      srcDir: '<%= pkg.channels["app"].src%>',
      destDir: '<%= pkg.channels["app"].dest%>',
      channel: 'app'
    },

    "copy": {
      "main": {
        flatten: true,
        "src": "<%= config.srcDir %>/common.js",
        "dest": "<%= config.srcDir %>/common_tmp.js"
      },
      'template': {
        "files": [
          {
            "expand": true,
            "cwd": "<%= config.srcDir %>",
            "src": ["**/*.html"],
            "dest": "<%= config.destDir %>"
          }
        ]
      }
    },

    "htmlmin": {
      "web": {
        "files": [
          {
            "expand": true,
            "cwd": "<%= config.srcDir%>/",
            "src": ["ui/*.html"],
            "dest": "<%= config.destDir%>/"
          }
        ]
      }
    },

    clean: {
      options: { force: true },
      main: '<%= config.destDir%>',
      tmpsrc: '<%= config.srcDir%>/common_tmp.js'
    },

    "strip": {
      "main": {
        "src": "<%= config.destDir %>/**/*.js",
        "options": {
          "inline": true
        }
      }
    },

    //requireJS没有包含的文件也需要移过去
    "uglify": {
      "main": {
        "options": {
          "report": "false",
          "mangle": {
            "except": ['$super']
          }
        },
        "files": [
          {
            "expand": true,
            "cwd": "<%= config.srcDir %>",
            "src": "**/*.js",
            "dest": "<%= config.destDir %>"
          }
        ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-strip');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');


  grunt.registerTask('default', 'default task', function () {
    grunt.task.run(['blade']);
  });

  grunt.registerTask('blade', 'require demo', function () {

    var cfg = grunt.file.readJSON('config.json');

    grunt.log.debug('参数：' + JSON.stringify(cfg.requirejs, null, 2));

    //改写参数，为ui组件添加文件


    grunt.log.debug('参数1：' + JSON.stringify(cfg.requirejs, null, 2));


    grunt.config.set('requirejs', cfg.requirejs);

    grunt.task.run(['clean:main', 'uglify', 'copy:main', 'requirejs', 'clean:tmpsrc', 'copy:template', 'strip']);


  });


}