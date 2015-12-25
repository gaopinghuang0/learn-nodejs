var Movie = require('../models/movie')
var Category = require('../models/category')

// index page
exports.index = function(req, res) {
	Category
		.find({})
		.populate({path: 'movies', options: {limit: 5}})
		.exec(function(err, categories) {
			if (err) {
				console.log(err)
			}

			res.render('index', {
				title: 'imooc Homepage',
				categories: categories
			})
		})
}

// search page
exports.search = function(req, res) {
	var catId = req.query.cat
	var q = req.query.q
	var page = parseInt(req.query.p, 10) || 0   // default 0
	var numPerPage = 2
	var index = page * numPerPage

	if (catId) {  // from result page, jump to different page
		Category
			.find({_id: catId})
			.populate({
				path: 'movies',
				select: 'title poster'
			})
			.exec(function(err, categories) {
				if (err) {
					console.log(err)
				}

				var category = categories[0] || {}
				var movies = category.movies || []
				var results = movies.slice(index, index + numPerPage)

				res.render('results', {
					title: 'imooc 结果列表页面',
					keyword: category.name,
					currentPage: (page + 1),
					query: 'cat=' + catId,
					totalPage: Math.ceil(movies.length / numPerPage),
					movies: results
				})
			})
	} else {  // from header search box
		Movie
			.find({title: new RegExp(q+'.*')})  // support partial match
			.exec(function(err, movies) {
				if (err) {
					console.log(err)
				}

				var results = movies.slice(index, index + numPerPage)

				res.render('results', {
					title: 'imooc 结果列表页面',
					keyword: q,
					currentPage: (page + 1),
					query: 'q=' + q,
					totalPage: Math.ceil(movies.length / numPerPage),
					movies: results
				})
			})
	}
}