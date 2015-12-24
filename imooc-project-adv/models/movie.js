var mongoose = require('mongoose')
var MovieSchema = require('../schemas/movie')
// mongoose will automatically append an 's' as collection name, eg. movies
// To force a collection name, edit Schema as below:
// var dataSchema = new Schema({..}, { collection: 'data' })
// Credit: http://stackoverflow.com/questions/10547118/why-does-mongoose-always-add-an-s-to-the-end-of-my-collection-name
var Movie = mongoose.model('Movie', MovieSchema)

module.exports = Movie