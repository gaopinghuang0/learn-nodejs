var http = require('http')
var querystring = require('querystring')

var postData = querystring.stringify({
	'content': 'Good course',
	'mid': 8837
})

var options = {
	hostname: 'www.imooc.com',
	port: 80,
	path: '/course/document',
	method: 'POST',
	headers: {
		'Accept': '...',
		'Accept-Encoding': '...',
		// ...
		'Content-Length': postData.length,
		'Cookie': '...',
		// ...
	}
}


var req = http.request(options, function(res) {
	console.log('Status: ' + res.statusCode)
	console.log('headers: ' + JSON.stringify(res.headers))

	res.on('data', function(chunk) {
		console.log(Buffer.isBuffer(chunk))
		console.log(typeof chunk)
	})

	res.on('end', function() {
		console.log('Comment completed!')
	})
})

req.on('error', function(e) {
	console.log('Error: ' + e.message)
})

req.write(postData)
req.end()