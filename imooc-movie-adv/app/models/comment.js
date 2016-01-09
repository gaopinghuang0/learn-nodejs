var mongoose = require('mongoose')
var CommentSchema = require('../schemas/comment')
// use MyComment to pass jshint, since Comment is built-in global
// otherwise redifinition of Comment error
var MyComment = mongoose.model('Comment', CommentSchema)

module.exports = MyComment