module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
          options: {
              separator: '\n'
          },
          dist: {
              files:{
                'dist/js/script.js': [
                  'src/**/*.js'
                ],
                'dist/css/style.css': [
                  'src/**/*.css', 
                  'dist/css/*.css'
                ],
              }
          }
        },
        watch: {
          scripts:{
            files: ['src/**/*.js'], 
            tasks: ['scriptsTasks'],
          },
          styles:{
            files: ['src/**/*.css', 'src/**/*.less'], 
            tasks: ['stylesTasks'],
          },
          htmls:{
            files: ['src/**/*.html'], 
            tasks: ['htmlsTasks'],
          },

        },
        less: {
            distribution: {
                files: {
                  'dist/css/lessStyle.css': 'src/less/style.less'
                }
            }
        },
        clean: {
          dist: ['dist/'],
          css: ['dist/css/'],
          less: ['dist/css/lessStyle.css']
        },
        autoprefixer:{
          dist:{
            files:{
              'dist/css/style.css':'dist/css/style.css'
            }
          }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'dist/**'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './dist'
                }
            }
        },
        copy: {
          main: {
            files: [
              {expand: true, cwd: 'node_modules/', src: ['font-awesome/**'], dest: 'dist/lib/'},
              {expand: true, cwd: 'node_modules/', src: ['jquery/**'], dest: 'dist/lib/'},
              {expand: true, cwd: 'node_modules/', src: ['bootstrap/dist/**'], dest: 'dist/lib/'},
            ],
          },
        },
        processhtml: {
          dist: {
            options: {
              process: true,
              data: {
                title: 'My app',
              }
            },
            files: {
              'dist/index.html': ['src/index.html']
            }
          },
        },
      });
    
      grunt.loadNpmTasks('grunt-contrib-less');
      grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.loadNpmTasks('grunt-contrib-concat');
      grunt.loadNpmTasks('grunt-contrib-clean');
      grunt.loadNpmTasks('grunt-contrib-copy');
      grunt.loadNpmTasks('grunt-autoprefixer');
      grunt.loadNpmTasks('grunt-processhtml');
      grunt.loadNpmTasks('grunt-browser-sync');
    
  
      grunt.registerTask('scriptsTasks', ['concat']);
      grunt.registerTask('stylesTasks', ['clean:css', 'less:distribution', 'concat', 'autoprefixer', 'clean:less']);
      grunt.registerTask('htmlsTasks', ['processhtml']);
      grunt.registerTask('default', ['clean:dist', 'copy', 'less:distribution', 'concat', 'autoprefixer','clean:less', 'processhtml', 'browserSync', 'watch']);//
      
}