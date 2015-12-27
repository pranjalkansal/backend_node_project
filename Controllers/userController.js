const jwt = require('jsonwebtoken');
const Bcrypt = require('bcrypt');

const Config = require('../Config/index.js');
const Mongoose = require('../DAO/mongo.js');
const Schema = require('../DAO/schema.js');

var Users = Mongoose.model('users', Schema.register);
var user_controller = {
	user_login: function (request, reply) {
		Users.findOne({'email': request.payload.username}, function(error, result) {
			if(error) {
				console.log(Config.Database.query.error);
				return false;
			}
			console.log(Config.Database.query.success);
			if(result) {
				console.log(Config.Message.user.login.success);
				var payload = {
					issuer: request.payload.username,
					expiresIn: Config.Base.token.expire
				};
				var token = jwt.sign(payload, Config.Base.token.secret , function(error) {
					if(error)
						console.log(Config.Message.token.create.error);
					else
						console.log(Config.Message.token.create.success);
				});
				return reply(token);
			}
			return reply(Config.Message.user.login.error);
		});
	},
	user_register: function (request, reply) {
		Bcrypt.genSalt(Config.Base.bcrypt.rounds, function(error, salt) {
			if(error) {
				console.log(Config.Message.bcrypt.salt.error);
				return false;
			}
			console.log(Config.Message.bcrypt.salt.success);
			Bcrypt.hash(request.payload.password, salt, function(error, hash) {
				if(error) {
					console.log(Config.Message.bcrypt.hash.error);
					return false;
				}
				console.log(Config.Message.bcrypt.hash.success);
				request.payload.password = hash;
				var users = new Users(request.payload);
				users.save(function(error) {
					if(error) {
						console.log(Config.Database.entry.error + 'Email already registered!!');
						return reply(Config.Database.entry.error + 'Email already registered!!');
					}
					else {
						console.log(Config.Database.entry.success);
						return reply(Config.Database.entry.success);
					}
				});
			});
		});
	},
	user_search: function (request, reply) {
		if(request.params.value) {
			Users.find({}, {'password': 0, '_id': 0}, function(error, result) {
				if(error) {
					console.log(Config.Database.query.error);
					return false;
				}
				console.log(Config.Database.query.success);
				var registered_users = result;
				var filtered_result = [];
				var value = request.params.value.toLowerCase();
				registered_users.forEach(function(column) {
					if(column.first_name.search(value)>-1 || column.last_name.search(value)>-1 || column.email.search(value)>-1) {
						filtered_result.push(column);
					}
				});
				return reply(filtered_result);
			}); 
		}
	}
};

module.exports = user_controller;
