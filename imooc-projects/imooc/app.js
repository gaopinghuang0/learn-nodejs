var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var mongoose = require('mongoose')
var _ = require('underscore')
var Movie = require('./models/movie')
var port = process.env.PORT || 3000
var app = express()

mongoose.connect('mongodb://localhost/imooc')

app.set('views', './views/pages')
app.set('view engine', 'jade')
// use body-parser to grab info from POST
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'bower_components')))
app.listen(port)

console.log('imooc stated on part ' + port)

// index page
app.get('/', function(req, res) {
	Movie.fetch(function(err, movies) {
		if (err) {
			console.log(err)
		}

		res.render('index', {
			title: 'imooc Homepage',
			movies: movies
		})
	})
})

// detail page
app.get('/movie/:id', function(req, res) {
	var id = req.params.id

	Movie.findById(id, function(err, movie) {
		res.render('detail', {
			title: 'imooc ' + movie.title,
			movie: movie
		})
	})
})

// admin page
app.get('/admin/movie', function(req, res) {
	res.render('admin', {
		title: 'imooc Add new',
		movie: {
			doctor: '',
			country: '',
			title: '',
			year: '',
			poster: '',
			language: '',
			flash: '',
			summary: ''
		}

	})
})

// admin update movie
app.get('/admin/update/:id', function(req, res) {
	var id = req.params.id

	if (id) {
		Movie.findById(id, function(err, movie) {
			res.render('admin', {
				title: 'imooc Update',
				movie: movie
			})
		})
	}
})

// admin post movie
app.post('/admin/movie/new', function(req, res) {
	var id = req.body.movie._id
	var movieObj = req.body.movie
	var _movie

	if (id !== 'undefined') {
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
		_movie = new Movie({
			doctor: movieObj.doctor,
			title: movieObj.title,
			country: movieObj.country,
			language: movieObj.language,
			year: movieObj.year,
			poster: movieObj.poster,
			summary: movieObj.summary,
			flash: movieObj.flash,
		})

		_movie.save(function(err, movie) {
			if (err) {
				console.log(err)
			}

			res.redirect('/movie/' + movie._id)
		})
	}
})

// list page
app.get('/admin/list', function(req, res) {
	Movie.fetch(function(err, movies) {
		if (err) {
			console.log(err)
		}

		res.render('list', {
			title: 'imooc List',
			movies: movies
		})
	})
	// res.render('list', {
		// title: 'imooc List',
		// movies: [{
		// 	title: '机械战警',
		// 	_id: 1,
		// 	doctor: '何塞',
		// 	country: "USA",
		// 	year: 2014,
		// 	language: 'English',
		// 	flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
		// 	summary: '2028年，专事军火开发的机器人公司Omni Corp.生产了大量装备精良的机械战警，他被投入到维和和惩治犯罪等行动中，取得显著的效果。罪犯横行的底特律市，嫉恶如仇、正义感十足的警察亚历克斯·墨菲（乔尔·金纳曼 Joel Kinnaman饰）遭到仇家暗算，身体受到毁灭性破坏。借助于Omni公司天才博士丹尼特·诺顿（加里·奥德曼 Gary Oldman 饰）最前沿的技术，墨菲以机械战警的形态复活。数轮严格的测试表明，墨菲足以承担起维护社会治安的重任，他的口碑在民众中直线飙升，而墨菲的妻子克拉拉（艾比·考尼什 Abbi Cornish饰）和儿子大卫却再难从他身上感觉亲人的温暖。'
		// }]
	// })
})

