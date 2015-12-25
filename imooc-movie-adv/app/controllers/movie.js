var Movie = require('../models/movie')
var Comment = require('../models/comment')
var Category = require('../models/category')
var _ = require('underscore')
var fs = require('fs')
var path = require('path')

// detail page
exports.detail = function(req, res) {
	var id = req.params.id

	Movie.findById(id, function(err, movie) {
		Comment
			.find({movie: id})
			.populate('from', 'name')
			.populate('reply.from reply.to', 'name')
			.exec(function(err, comments) {
				res.render('detail', {
					title: 'imooc ' + movie.title,
					movie: movie,
					comments: comments
				})
			})
	})
}

// admin page
exports.new = function(req, res) {
	Category.find({}, function(err, categories) {
		res.render('admin', {
			title: 'imooc Add new',
			categories: categories,
			movie: {}
		})
	})
}

// admin update movie
exports.update = function(req, res) {
	var id = req.params.id

	if (id) {
		Movie.findById(id, function(err, movie) {
			Category.find({}, function(err, categories) {
				res.render('admin', {
					title: 'imooc Update',
					movie: movie,
					categories: categories
				})
			})
		})
	}
}

// admin save poster file
exports.savePoster = function(req, res, next) {
	var posterData = req.files.uploadPoster
	var filePath = posterData.path
	var originalFilename = posterData.originalFilename

	if (originalFilename) {
		console.log(posterData)
		fs.readFile(filePath, function(err, data) {
			if (err) {
				console.log(err)
			}
			var timestamp = Date.now()
			var type = posterData.type.split('/')[1]
			var poster = timestamp + '.' + type
			var newPath = path.join(__dirname, '../../', '/public/upload/' + poster)

			fs.writeFile(newPath, data, function(err) {
				console.log("i am here")
				req.poster = poster
				next()
			})
		})
	} else {  // no file upload
		next()
	}

}

// admin post movie
exports.save = function(req, res) {
	// bodyParser extended = true -> is the key!!!, otherwise undefined
	var id = req.body.movie._id
	var movieObj = req.body.movie
	var _movie;

	if (req.poster) {  // has uploaded file
		movieObj.poster = req.poster
	}

	if (id) {  // typeof id == string
		// TODO: update category if cid is diff or categoryName is entered 
		Movie.findById(id, function(err, movie) {
			if (err) {
				console.log(err)
			}

			_movie = _.extend(movie, movieObj)
			_movie.save(function(err, movie) {
				if (err) {
					console.log(err)
				}

				res.redirect('/movie/' + movie._id)
			})
		})
	} else {
		_movie = new Movie(movieObj)

		var categoryId = movieObj.category
		var categoryName = movieObj.categoryName

		_movie.save(function(err, movie) {
			if (err) {
				console.log(err)
			}

			if (categoryId) {  // select existing category
				Category.findById(categoryId, function(err, category) {
					category.movies.push(movie._id)

					category.save(function(err, category) {
						res.redirect('/movie/' + movie._id)
					})
				})
			} else if (categoryName) {  // enter new categoryName
				var category = new Category({
					name: categoryName,
					movies: [movie._id]
				})

				category.save(function(err, category) {
					movie.category = category._id
					movie.save(function(err, movie) {
						res.redirect('/movie/' + movie._id)
					})
				})
			} else {
				// do nothing
				console.log('No category entered or selected')
			}
		})
	}
}

// list page
exports.list = function(req, res) {
	Movie.fetch(function(err, movies) {
		if (err) {
			console.log(err)
		}

		res.render('list', {
			title: 'imooc List',
			movies: movies
		})
	})
}

// list delete movie
exports.del = function(req, res) {
	var id = req.query.id;

	if (id) {
		Movie.remove({_id: id}, function(err, movie) {
			if (err) {
				console.log(err)
			} else {
				res.json({success: 1})
			}
		})
	}
}