var klass = require('./klass')


// exports the school to outside
exports.add = function(klasses) {
	klasses.forEach(function(item, index) {
		var _klass = item,
			teacherName = item.teacherName,
			students = item.students;

		_klass.add(teacherName, students)

	})
}