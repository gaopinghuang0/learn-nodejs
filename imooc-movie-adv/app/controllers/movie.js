var Movie = require('../models/movie')
var Comment = require('../models/comment')
var Category = require('../models/category')
var _ = require('underscore')

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

// admin post movie
exports.save = function(req, res) {
	// bodyParser extended = true -> is the key!!!, otherwise undefined
	var id = req.body.movie._id
	var movieObj = req.body.movie
	var _movie;

	if (id) {  // typeof id == string
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

		var categoryId = _movie.category

		_movie.save(function(err, movie) {
			if (err) {
				console.log(err)
			}

			Category.findById(categoryId, function(err, category) {
				category.movies.push(movie._id)

				category.save(function(err, category) {
					res.redirect('/movie/' + movie._id)
				})
			})
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