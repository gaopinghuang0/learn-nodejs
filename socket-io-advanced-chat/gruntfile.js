module.exports = function(grunt) {

	grunt.initConfig({
		watch: {
			jade: {
				files: ['views/**'],
				options: {
					livereload: true
				}
			},
			anykey: {  // the key could be any string
				files: ['index.html'],
				options: {
					livereload: true
				}
			},
			js: {
				files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
				// tasks: ['jshint'],
				options: {
					livereload: true
				}
			}
		},

		nodemon: {
			dev: {
				script: 'server.js',
				options: {
					args: [],
					callback: function (nodemon) {
						nodemon.on('log', function (event) {
							console.log(event.colour);
						});
					},
					env: {
						PORT: '3000'
					},
					cwd: __dirname,
					ignore: ['node_modules/**', 'README.md', '.DS_Store'],
					ext: 'js,coffee',
					watch: ['./'],
					delay: 1000,
					legacyWatch: true
				}
			},
		},

		concurrent: {
			tasks: ['nodemon', 'watch'],
			options: {
				logConcurrentOutput: true
			}
		}
	})

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');

	// do not abort when error
	grunt.option('force', true);

	grunt.registerTask('default', ['concurrent']);
}