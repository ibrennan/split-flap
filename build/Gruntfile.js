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
				tasks: ['copy', 'notify:watch'],
				options: {
					interrupt: true
				}
			},
			sass: {
				files: 'sass/**',
				tasks: ['compass', 'copy', 'notify:watch'],
				options: {
					interrupt: true
				}
			},
			images: {
				files: 'images/**',
				tasks: ['copy', 'notify:watch'],
				options: {
					interrupt: true
				}
			}
		},

		notify: {
			watch: {
				options: {
					title: 'Build Complete',  // optional
					message: 'All files have compiled and been moved', //required
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-compass');

	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.loadNpmTasks('grunt-notify');

	grunt.registerTask('default', ['compass', 'copy', 'notify:watch']);

};