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

    clean: {
      options: { force: true },
      main: '<%= config.destDir%>'
    }

  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-strip');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-replace');


  grunt.registerTask('default', 'default task', function () {
    grunt.task.run(['blade']);
  });

  grunt.registerTask('blade', 'require demo', function () {

    //第一步，读取配置信息
    var cfg = grunt.file.readJSON('config.json');

    //第二步，设置参数
    grunt.log.debug('参数：' + JSON.stringify(cfg, null, 2));

    //第三步跑任务
    grunt.task.run(['clean']);
    grunt.config.set('requirejs', cfg.requirejs);

    grunt.task.run(['clean', 'requirejs']);


  });


}