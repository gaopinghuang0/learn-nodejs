var express = require('express')
var bodyParser = require('body-parser')
var session = require('express-session')
var mongoStore = require('connect-mongo')(session)
var logger = require('morgan')  // previously express.logger
var path = require('path')
var mongoose = require('mongoose')

var port = process.env.PORT || 3000
var dbUrl = 'mongodb://localhost/imooc'
var app = express()

mongoose.connect(dbUrl)

app.set('views', './app/views/pages')
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

if ('development' === app.get('env')) {
	app.set('showStackError', true)
	app.use(logger(':method :url :status'))
	app.locals.pretty = true
	mongoose.set('debug', true)
}

// all route config
require('./config/routes')(app)

app.locals.moment = require('moment')
app.listen(port)

console.log('imooc stated on port ' + port)
