module.exports = function(grunt) {

	grunt.initConfig({
		watch: {
			jade: {
				files: ['views/**'],
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
				script: 'app.js',
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

		uglify: {
			development: {
				files: {
					'public/build/admin.min.js': 'public/js/admin.js',
					'public/build/detail.min.js': 'public/js/detail.js'
				}
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc',
				ignores: ['public/libs/**/*.js']
			},
			all: ['gruntfile.js', 'public/js/*.js', 'test/**/*.js', 'app/**/*.js']
		},

		mochaTest: {
			test: {
				options: {
					reporter: 'spec'
				}
			},
			src: ['test/**/*.js']
		},

		concurrent: {
			tasks: ['nodemon', 'watch', 'uglify', 'jshint'],
			options: {
				logConcurrentOutput: true
			}
		}
	})

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// do not abort when error
	grunt.option('force', true);

	grunt.registerTask('default', ['concurrent']);
	grunt.registerTask('test', ['mochaTest'])
}