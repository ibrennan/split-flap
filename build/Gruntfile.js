module.exports = function (grunt) {

	grunt.initConfig({ 

		// Declare our package dependencies
		// use 'npm install' to retrieve them
		pkg: grunt.file.readJSON('package.json'),

		// Compass configuration
		compass: {
			styles: {
				options: {
					config: 'config.rb'
				}
			}
		},

		// Copy files to production directory
		copy: {
			main: {
				files: [
					{
						// Copy all images, exclude _icons as these are
						// pre-compiled files for Compass to build sprites
						expand: true,
						src: ['images/**', '!images/_icons/**', '!images/_icons2x/**'],
						dest: '../www/_includes/',
						filter: 'isFile'
					},
					{
						// Copy all JS, at a later stage this will only copy
						// compiled JS through Uglify
						expand: true,
						src: ['js/**'],
						dest: '../www/_includes/',
						filter: 'isFile'
					}
				]
			}
		},

		// Pole our files for changes
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

		// Send notification when build has completed, notify also alerts
		// the developer of any failed processes within Grunt.
		notify: {
			watch: {
				options: {
					title: 'Build Complete',  // optional
					message: 'All files have compiled and been moved', //required
				}
			}
		}

	});

	// Load our Node tasks, referenced in package.json
	grunt.loadNpmTasks('grunt-contrib-compass');

	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.loadNpmTasks('grunt-notify');

	// Our default task, eventually this will have tasks for different
	// enviroment release builds.
	grunt.registerTask('default', ['compass', 'copy', 'notify:watch']);

};