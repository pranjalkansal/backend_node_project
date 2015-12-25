const jwt = require('jsonwebtoken');
const Config = require('../Config/index.js');
const Mongoose = require('../DAO/mongo.js');
const Schema = require('../DAO/schema.js');

var Users = Mongoose.model('users', Schema.register);
var user_controller = {
	user_login: function (request, reply) {
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
	},
	user_register: function (request, reply) {
		var users = new Users(request.payload);
		users.save(function(error) {
			if(error)
				console.log(Config.Database.entry.error + 'Email already registered!!');
			else
				console.log(Config.Database.entry.success);
		});
		return reply(request.payload);
	}
};

module.exports = user_controller;