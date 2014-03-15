module.exports = function (grunt) {

	var jsFiles = [
        'js/main.js'
    ];

	grunt.initConfig({ 

		pkg: grunt.file.readJSON('package.json'),

		compass: {
			styles: {
				options: {
					config: 'config.rb'
				}
			}
		},

		copy: {
			main: {
				files: [
					{
						expand: true,
						src: ['images/**', '!images/_icons/**', '!images/_icons2x/**'],
						dest: '../www/_includes/',
						filter: 'isFile'
					},
					{
						expand: true,
						src: ['js/**'],
						dest: '../www/_includes/',
						filter: 'isFile'
					}
				]
			}
		},

		watch: {
			js: {
				files: 'js/**',
				tasks: ['copy'],
				options: {
					interrupt: true
				}
			},
			sass: {
				files: 'sass/**',
				tasks: ['compass', 'copy'],
				options: {
					interrupt: true
				}
			},
			images: {
				files: 'images/**',
				tasks: ['copy'],
				options: {
					interrupt: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-compass');

	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['compass', 'copy']);

};