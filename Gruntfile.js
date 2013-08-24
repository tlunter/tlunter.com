module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-recess');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      vendor: {
        files: [
          {
            expand: true,
            cwd: 'vendor/**/js/',
            src: '**',
            dest: 'public/js/'
          },
          {
            expand: true,
            cwd: 'vendor/**/css/',
            src: '**',
            dest: 'public/css/'
          },
          {
            expand: true,
            cwd: 'vendor/**/font/',
            src: '**',
            dest: 'public/font/'
          }
        ]
      }
    },
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
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
      }
    },
    watch: {
      all: {
        files: ['<%= concat.js.src %>'],
        tasks: ['default', 'timestamp']
      }
    },
    recess: {
      dist: {
        options: {
          compile: true
        },
        files: {
          'public/css/<%= pkg.name %>.css': 'tmp/less/<%= pkg.name %>.less'
        }
      },
      min: {
        options: {
          compress: true
        },
        files: {
          'public/css/<%= pkg.name %>.min.css': 'public/css/<%= pkg.name %>.css'
        }
      }
    }
  });

  grunt.registerTask('default', ['copy', 'concat', 'uglify', 'recess']);

  grunt.registerTask('timestamp', function() {
    grunt.log.subhead(Date());
  });
};
