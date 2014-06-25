var path = require('path');

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-react');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      react: {
        files: [
          {
            expand: true,
            cwd: 'bower_components/react/',
            src: ['react.js','react.min.js'],
            dest: 'public/js/'
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
      pure: {
        files: [
          {
            expand: true,
            flatten: true,
            cwd: 'bower_components/pure/',
            src: ['pure.css'],
            dest: 'public/css/',
          }
        ]
      },
      underscore: {
        files: [
          {
            expand: true,
            flatten: true,
            cwd: 'bower_components/underscore/',
            src: ['underscore.js'],
            dest: 'public/js/',
          }
        ]
      },
      aviator: {
        files: [
          {
            expand: true,
            flatten: true,
            cwd: 'bower_components/aviator/',
            src: ['aviator.js'],
            dest: 'public/js/',
          }
        ]
      },
      reqwest: {
        files: [
          {
            expand: true,
            flatten: true,
            cwd: 'bower_components/reqwest/',
            src: ['reqwest.js'],
            dest: 'public/js/',
          }
        ]
      },
      moment: {
        files: [
          {
            expand: true,
            flatten: true,
            cwd: 'bower_components/moment/',
            src: ['moment.js'],
            dest: 'public/js/',
          }
        ]
      },
      cookies: {
        files: [
          {
            expand: true,
            flatten: true,
            cwd: 'bower_components/Cookies/src',
            src: ['cookies.js'],
            dest: 'public/js/',
          }
        ]
      },
      js: {
        files: [
          {
            expand: true,
            cwd: 'app/assets/js/',
            src: ['**/*.js'],
            dest: 'tmp/js/'
          }
        ]
      }
    },
    react: {
      jsx: {
        files: [
          {
            expand: true,
            cwd: 'app/assets/jsx',
            src: '**/*.jsx',
            dest: 'tmp/js',
            ext: '.js'
          }
        ]
      }
    },
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ''
      },
      js: {
        // the files to concatenate
        src: ['tmp/js/**/*.js'],
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
        files: {
          'public/js/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>'],
        }
      },
      vendor: {
        files: {
          'public/js/underscore.min.js': ['public/js/underscore.js'],
          'public/js/aviator.min.js': ['public/js/aviator.js'],
          'public/js/reqwest.min.js': ['public/js/reqwest.js'],
          'public/js/moment.min.js': ['public/js/moment.js'],
          'public/js/cookies.min.js': ['public/js/cookies.js']
        }
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
        }
      },
      vendor: {
        options: {
          compress: true
        },
        files: {
          'public/css/pure.min.css': 'public/css/pure.css'
        }
      }
    },
    watch: {
      all: {
        files: ['app/assets/js/**/*', 'app/assets/less/**/*', 'app/assets/jsx/**/*'],
        tasks: ['copy:js', 'react:jsx', 'concat:js', 'concat:css', 'uglify:js', 'recess:dist', 'recess:min', 'timestamp']
      }
    }
  });

  grunt.registerTask('default', ['copy', 'react', 'concat', 'uglify', 'recess']);

  grunt.registerTask('timestamp', function() {
    grunt.log.subhead(Date());
  });
};
