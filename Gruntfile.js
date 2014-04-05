var path = require('path');

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-recess');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      angular: {
        files: [
          {
            expand: true,
            cwd: 'bower_components/angular/',
            src: ['angular.js'],
            dest: 'tmp/angular/'
          }
        ]
      },
      angular_resource: {
        files: [
          {
            expand: true,
            cwd: 'bower_components/angular-resource/',
            src: ['angular-resource.js'],
            dest: 'tmp/angular/'
          }
        ] 
      },
      angular_route: {
        files: [
          {
            expand: true,
            cwd: 'bower_components/angular-route/',
            src: ['angular-route.js'],
            dest: 'tmp/angular/'
          }
        ] 
      },
      angular_sanitize: {
        files: [
          {
            expand: true,
            cwd: 'bower_components/angular-sanitize/',
            src: ['angular-sanitize.js'],
            dest: 'tmp/angular/'
          }
        ] 
      },
      font_awesome: {
        files: [
          {
            expand: true,
            cwd: 'bower_components/font-awesome/css/',
            src: '**',
            dest: 'public/css/'
          },
          {
            expand: true,
            cwd: 'bower_components/font-awesome/fonts/',
            src: '**',
            dest: 'public/fonts/'
          }
        ]
      },
      purecss: {
        files: [
          {
            expand: true,
            flatten: true,
            src: [
              'bower_components/normalize-css/normalize.css',
              'bower_components/purecss/src/**/*.css'
            ],
            dest: 'tmp/purecss',
            rename: function (dest, src) {
              // normalize -> base
              if (src === 'normalize.css') {
                src = 'base.css';
              }

              return path.join(dest, src);
            }
          }
        ]
      }
    },
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ''
      },
      angular: {
        src: ['tmp/angular/angular.js', 'tmp/angular/angular-resource.js', 'tmp/angular/angular-route.js', 'tmp/angular/angular-sanitize.js'],
        dest: 'public/js/angular.js'
      },
      purecss: {
        src: [
          'tmp/purecss/base.css',
          'tmp/purecss/buttons-core.css',
          'tmp/purecss/buttons.css',
          'tmp/purecss/forms.css',
          'tmp/purecss/forms-r.css',
          'tmp/purecss/grids-core.css',
          'tmp/purecss/grids-units.css',
          'tmp/purecss/grids-r.css',
          'tmp/purecss/menus-core.css',
          'tmp/purecss/menus.css',
          'tmp/purecss/menus-paginator.css',
          'tmp/purecss/menus-r.css',
          'tmp/purecss/tables.css',
        ],
        dest: 'public/css/pure.css'
      },
      js: {
        // the files to concatenate
        src: [
          'app/assets/js/**/*.js'
        ],
        // the location of the resulting JS file
        dest: 'public/js/<%= pkg.name %>.js'
      },
      css: {
        src: ['app/assets/less/**/*.less'],
        dest: 'tmp/less/<%= pkg.name %>.less'
      }
    },
    uglify: {
      js: {
        src: ['<%= concat.js.dest %>'],
        dest: 'public/js/<%= pkg.name %>.min.js'
      },
      angular: {
        src: ['<%= concat.angular.dest %>'],
        dest: 'public/js/angular.min.js'
      }
    },
    watch: {
      all: {
        files: ['<%= concat.js.src %>', '<%= concat.css.src %>'],
        tasks: ['concat:js', 'concat:css', 'uglify:js', 'recess:dist', 'recess:min', 'timestamp']
      }
    },
    recess: {
      dist: {
        options: {
          compile: true
        },
        files: {
          'public/css/<%= pkg.name %>.css': 'tmp/less/*.less'
        }
      },
      min: {
        options: {
          compress: true
        },
        files: {
          'public/css/<%= pkg.name %>.min.css': 'public/css/<%= pkg.name %>.css',
          'public/css/pure.min.css': 'public/css/pure.css'
        }
      }
    }
  });

  grunt.registerTask('default', ['copy', 'concat', 'uglify', 'recess']);

  grunt.registerTask('timestamp', function() {
    grunt.log.subhead(Date());
  });
};
