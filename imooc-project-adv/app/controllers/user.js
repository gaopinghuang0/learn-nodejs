var User = require('../models/user')

// signup
exports.signup = function(req, res) {
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
