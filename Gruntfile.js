module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-recess');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      jquery: {
        files: [
          {
            expand: true,
            cwd: 'bower_components/jquery/',
            src: ['jquery.js', 'jquery.min.js'],
            dest: 'public/js/'
          }
        ]
      },
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
            cwd: 'bower_components/font-awesome/font/',
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
      angular: {
        src: ['tmp/angular/angular.js', 'tmp/angular/angular-resource.js', 'tmp/angular/angular-route.js', 'tmp/angular/angular-sanitize.js'],
        dest: 'public/js/angular.js'
      },
      bootstrap: {
        src: [
          'bower_components/bootstrap/js/bootstrap-transition.js',
          'bower_components/bootstrap/js/bootstrap-alert.js',
          'bower_components/bootstrap/js/bootstrap-button.js',
          'bower_components/bootstrap/js/bootstrap-carousel.js',
          'bower_components/bootstrap/js/bootstrap-collapse.js',
          'bower_components/bootstrap/js/bootstrap-dropdown.js',
          'bower_components/bootstrap/js/bootstrap-modal.js',
          'bower_components/bootstrap/js/bootstrap-tooltip.js',
          'bower_components/bootstrap/js/bootstrap-popover.js',
          'bower_components/bootstrap/js/bootstrap-scrollspy.js',
          'bower_components/bootstrap/js/bootstrap-tab.js',
          'bower_components/bootstrap/js/bootstrap-typeahead.js',
          'bower_components/bootstrap/js/bootstrap-affix.js'
        ],
        dest: 'public/js/bootstrap.js'
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
      },
    },
    uglify: {
      js: {
        src: ['<%= concat.js.dest %>'],
        dest: 'public/js/<%= pkg.name %>.min.js'
      },
      bootstrap: {
        src: ['<%= concat.bootstrap.dest %>'],
        dest: 'public/js/bootstrap.min.js'
      }
    },
    watch: {
      all: {
        files: ['<%= concat.js.src %>'],
        tasks: ['default', 'timestamp']
      }
    },
    recess: {
      bootstrap: {
        options: {
          compile: true
        },
        files: [
          {
            expand: true,
            cwd: 'bower_components/bootstrap/less',
            src: 'bootstrap.less',
            dest: 'public/css/',
            ext: '.css'
          }
        ]
      },
      bootstrap_min: {
        options: {
          compress: true
        },
        files: {
          'public/css/bootstrap.min.css': 'public/css/bootstrap.css'
        }
      },
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
