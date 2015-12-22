var EventEmitter = require('events').EventEmitter

var life = new EventEmitter()

life.setMaxListeners(11)

var water = function(who) {
	console.log('do prepare water for ' + who)
}

life.on('comfort', water)

life.on('comfort', function(who) {
	console.log('do rub shoulders for ' + who)
})

life.on('comfort', function(who) {
	console.log('do cook for ' + who)
})

life.on('comfort', function(who) {
	console.log('do wash clothes for ' + who)
})

life.on('comfort', function(who) {
	console.log('do ...5 for ' + who)
})

life.on('comfort', function(who) {
	console.log('do ...6 for ' + who)
})

life.on('comfort', function(who) {
	console.log('do ...7 for ' + who)
})

life.on('comfort', function(who) {
	console.log('do ...8 for ' + who)
})

life.on('comfort', function(who) {
	console.log('do ...9 for ' + who)
})

life.on('comfort', function(who) {
	console.log('do ...10 for ' + who)
})

life.on('comfort', function(who) {
	console.log('do too much things for ' + who)
})

life.on('love', function(who) {
	console.log('buy clothes for ' + who)
})

life.on('love', function(who) {
	console.log('hand over wages for ' + who)
})


// cannot remove annoymous function listener
life.removeListener('comfort', water)
// remove all listeners including 'comfort' and 'love'
// life.removeAllListeners()

// remove one kind of event
life.removeAllListeners('comfort')


var hasComfortListener = life.emit('comfort', 'boy')
var hasLovedListener = life.emit('love', 'girl')
var hasPlayedListener = life.emit('play', 'boy and girl')

console.log(hasComfortListener)
console.log(hasLovedListener)
console.log(hasPlayedListener)

// how many listeners left after removal
console.log(life.listeners('comfort').length)
console.log(EventEmitter.listenerCount(life, 'comfort'))
console.log(life.listeners('love').length)


