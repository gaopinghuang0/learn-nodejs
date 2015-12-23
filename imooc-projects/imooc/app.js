var express = require('express')
var port = process.env.PORT || 3000
var app = express()

app.set('views', './views')
app.set('view engine', 'jade')
app.listen(port)

console.log('imooc stated on part ' + port)

// index page
app.get('/', function(req, res) {
	res.render('index', {
		title: 'imooc Homepage'
	})
})

// detail page
app.get('/movie/:id', function(req, res) {
	res.render('detail', {
		title: 'imooc Detail'
	})
})

// admin page
app.get('/admin/movie', function(req, res) {
	res.render('admin', {
		title: 'imooc Admin'
	})
})

// list page
app.get('/admin/list', function(req, res) {
	res.render('list', {
		title: 'imooc List'
	})
})

