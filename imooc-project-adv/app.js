var express = require('express')
var bodyParser = require('body-parser')
var session = require('express-session')
var mongoStore = require('connect-mongo')(session)
var path = require('path')
var mongoose = require('mongoose')
var _ = require('underscore')
var Movie = require('./models/movie')
var User = require('./models/user')
var port = process.env.PORT || 3000
var dbUrl = 'mongodb://localhost/imooc'
var app = express()

mongoose.connect(dbUrl)

app.set('views', './views/pages')
app.set('view engine', 'jade')
// use body-parser to grab info from POST
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
	secret: 'imooc',
	store: new mongoStore({
		url: dbUrl,
		collection: 'sessions'
	}),
	resave: false,
	saveUninitialized: true
}))
app.locals.moment = require('moment')
app.listen(port)

console.log('imooc stated on port ' + port)

// pre handle user, so that every page can check session
app.use(function(req, res, next) {
	var _user = req.session.user

	if (_user) {
		app.locals.user = _user
	}
	return next()
})

// index page
app.get('/', function(req, res) {
	console.log('user in session: ')
	console.log(req.session.user)

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

// signup
app.post('/user/signup', function(req, res) {
	var _user = req.body.user;

	User.find({name: _user.name}, function(err, user) {
		if (err) {
			console.log(err);
		}

		if (user) {  // dup username
			return res.redirect('/');
		} else {
			var user = new User(_user);

			user.save(function(err, user) {
				if (err) {
					console.log(err);
				}
				res.redirect('/admin/userlist');
			})
		}
	})
})

// signin
app.post('/user/signin', function(req, res) {
	var _user = req.body.user,
		name = _user.name,
		passwd = _user.passwd;

	User.findOne({name: name}, function(err, user) {
		if (err) {
			console.log(err);
		}

		if (!user) {
			return res.redirect('/');
		}

		user.comparePasswd(passwd, function(err, isMatch) {
			if (err) {
				console.log(err);
			}

			if (isMatch) {
				req.session.user = user;

				return res.redirect('/');
			} else {
				console.log('Password is not matched');
			}
		})
	})
})

// logout
app.get('/logout', function(req, res) {
	delete req.session.user;
	delete app.locals.user;
	res.redirect('/')
})


// user list page
app.get('/admin/userlist', function(req, res) {
	User.fetch(function(err, users) {
		if (err) {
			console.log(err)
		}

		res.render('userlist', {
			title: 'imooc Userlist',
			users: users
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
	// bodyParser extended = true -> is the key!!!, otherwise undefined
	var id = req.body.movie._id
	var movieObj = req.body.movie
	var _movie;

	if (id !== 'undefined') {  // typeof id == string
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
})

// list delete movie
app.delete('/admin/list', function(req, res) {
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
})