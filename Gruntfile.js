module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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
    less: {
      all: {
        files: {
          'public/css/<%= pkg.name %>.css': 'tmp/less/<%= pkg.name %>.less'
        }
      }
    }
  });

  grunt.registerTask('default', ['concat', 'uglify', 'less']);

  grunt.registerTask('timestamp', function() {
    grunt.log.subhead(Date());
  });
};
