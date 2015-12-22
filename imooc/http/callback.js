function learn(something) {
	console.log(something)
}

function we(callback, something) {
	something += ' is cool'
	callback(something)
}

we(learn, 'Nodejs')

we(function(sth) {
	console.log(sth)
}, 'Jade')