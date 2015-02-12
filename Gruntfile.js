module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /*
     * UGLIFY JAVASCRIPT FILES
     * @desc uglify javascript (minify and obfuscate)
     * @grunt-contrib-uglify
    */
    uglify: {
      all: {
        options: {
          banner: '/*!\n <%= pkg.description %> v<%= pkg.version %>\n <%= pkg.website %>\n*/\n',
          mangle: true,
          preserveComments: 'some'
        },
        files: {
          'dist/<%= pkg.name %>-<%= pkg.version %>.min.js': 'src/<%= pkg.name %>.js'
        }
      }
    },
  });

  /*
   * REQUIRED NODE PACKAGED MODULES
  */
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['uglify']);

};
