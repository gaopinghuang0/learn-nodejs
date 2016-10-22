// get all controllers
var Index = require('./controllers/index')


module.exports = function(app) {

	// pre-handle user, so that every page can check session
	// app.use(function(req, res, next) {
	// 	var _user = req.session.user

	// 	app.locals.user = _user

	// 	next()
	// })

	// Index
	app.get('/', Index.index)

}