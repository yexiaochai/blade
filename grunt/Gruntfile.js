/**
 * yexiaochai 待续
 */
module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),



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
      main: '<%= config.destDir%>'
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
    var pkg = grunt.file.readJSON('package.json');
    var t = pkg.channels;
    var tasks = [], k, v, item;
    for (k in t) {
      v = t[k];
      item = 'blade:' + k
      tasks.push(item)
    }

    grunt.task.run(tasks);

  });

  grunt.registerTask('blade', 'require demo', function (channel) {
    //默认打框架包
    if (!channel) channel = 'app';

    var pkg = grunt.file.readJSON('package.json');
    var cfg = grunt.file.readJSON(pkg.channels[channel].src + '/gruntcfg.json');

    var config = {
      srcDir: pkg.channels[channel].src,
      destDir: pkg.channels[channel].dest
    };

    grunt.config.set('config', config);


    grunt.log.debug('参数：' + JSON.stringify(cfg.requirejs, null, 2));

    //改写参数，为ui组件添加文件


    grunt.log.debug('参数1：' + JSON.stringify(cfg.requirejs, null, 2));


    grunt.config.set('requirejs', cfg.requirejs);

    grunt.task.run(['clean:main', 'uglify', 'requirejs', 'copy:template', 'strip']);


  });


}