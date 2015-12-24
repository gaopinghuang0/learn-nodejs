var User = require('../models/user')


// show signup
exports.showSignup = function(req, res) {
	res.render('signup', {
		title: '注册页面'
	})
}

// show signin
exports.showSignin = function(req, res) {
	res.render('signin', {
		title: '登录页面'
	})
}

// signup
exports.signup = function(req, res) {
	var _user = req.body.user;

	User.find({name: _user.name}, function(err, user) {
		if (err) {
			console.log(err);
		}

		if (user) {  // dup username, ask signin
			return res.redirect('/signin');
		} else {
			var user = new User(_user);

			user.save(function(err, user) {
				if (err) {
					console.log(err);
				}
				res.redirect('/');
			})
		}
	})
}

// signin
exports.signin = function(req, res) {
	var _user = req.body.user,
	name = _user.name,
	passwd = _user.passwd;

	User.findOne({name: name}, function(err, user) {
		if (err) {
			console.log(err);
		}

		if (!user) {
			return res.redirect('/signup');
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
				return res.redirect('/signin')
			}
		})
	})
}

// logout
exports.logout = function(req, res) {
	delete req.session.user;
	//delete app.locals.user;
	res.redirect('/')
}

// user list page
exports.list = function(req, res) {
	User.fetch(function(err, users) {
		if (err) {
			console.log(err)
		}

		res.render('userlist', {
			title: 'imooc Userlist',
			users: users
		})
	})
}

// middleware for user
exports.signinRequired = function(req, res, next) {
	var user = req.session.user

	if (!user) {
		return res.redirect('/signin')
	}

	next()
}

// middleware for user
exports.adminRequired = function(req, res, next) {
	var user = req.session.user

	if (user.role <= 10) {
		return res.redirect('/signin')
	}

	next()
}

