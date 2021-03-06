var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var SALT_WORK_FACTOR = 10   // secure level

var UserSchema = new mongoose.Schema({
	name: {
		unique: true,
		type: String
	},
	passwd: String,
	// 0: normal user
	// 1: verified user
	// 2: professional user

	// >10: admin
	// >50: super admin
	role: {
		type: Number,
		default: 0
	},
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})

UserSchema.pre('save', function(next) {
	var user = this;

	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	} else {
		this.meta.updateAt = Date.now()
	}

	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.passwd, salt, function(err, hash) {
			if (err) return next(err);
			user.passwd = hash;
			next();
		})
	})
})

UserSchema.methods = {
	comparePasswd: function(_passwd, cb) {
		bcrypt.compare(_passwd, this.passwd, function(err, isMatch) {
			if (err) {
				return cb(err);
			}

			cb(null, isMatch);
		})
	}
}

UserSchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	findById: function(id, cb) {
		return this
			.findOne({_id: id})
			.exec(cb)
	}
}

module.exports = UserSchema


