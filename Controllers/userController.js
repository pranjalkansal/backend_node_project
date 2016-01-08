'use strict';

const jwt = require('jsonwebtoken');
const Bcrypt = require('bcrypt');

const Config = require('../Config/index.js');
const Mongoose = require('../DAO/mongo.js');
const Schema = require('../DAO/index.js');

var Users = Mongoose.model('users', Schema.user.register);
var Track = Mongoose.model('track_counts', Schema.query.track_count);
var user_controller = {
	user_login: function (request, reply) {
		Users.findOne({'email': request.payload.username}, {'email': 1, 'password': 1} , function(error, result) {
			if(error) {
				console.log(Config.Database.query.error);
				return reply(Config.Message.server.error);
			}
			console.log(Config.Database.query.success);
			if(result) {
				Bcrypt.compare(request.payload.password, result.password, function(error, result) {
					if(error) {
						console.log(Config.Message.bcrypt.compare.error);
						return reply(Config.Message.server.error);
					}
					else {
						console.log(Config.Message.bcrypt.compare.success);
						if(result) {
							jwt.sign(request.payload.username, Config.Base.token.secret, Config.Base.token.options,function(token) {
								if(!token) {
									console.log(Config.Message.token.create.error);
									return reply(Config.Message.server.error);
								}
								else {
									console.log(Config.Message.token.create.success);
									return reply(token);
								}
							});
						}
						else {
							console.log(Config.Message.user.login.error);
							return reply(Config.Message.user.login.error);
						}
					}
				});
			}
			else {
				console.log(Config.Message.user.login.error);
				return reply(Config.Message.user.login.error);
			}
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
				let users = new Users(request.payload);
				users.save(function(error) {
					if(error) {
						console.log(Config.Database.entry.error + 'Email already registered!!');
						return reply(Config.Database.entry.error + 'Email already registered!!');
					}
					else {
						Track.find({table: 'users'}, function(error, result) {
							if(error) {
								console.log(Config.Database.entry.error);
								return reply(Config.Message.server.error);
							}
							if(!result.length) {
								let track = new Track({table: 'users', count: 1});
								track.save(function(error) {
									if(error) {
										console.log(Config.Database.entry.error);
										return reply(Config.Message.server.error);
									}
									else {
										console.log(Config.Database.entry.success);
										return reply(Config.Database.entry.success);
									}
								});
							}
							else {
								Track.update({table: 'users'}, {$inc: {count: 1}}, function(error) {
									if(error) {
										console.log(Config.Database.entry.error);
										return reply(Config.Message.server.error);
									}
									else {
										console.log(Config.Database.entry.success);
										return reply(Config.Database.entry.success);
									}
								});
							}
						});
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
				let filtered_result = [];
				let value = request.params.value.toLowerCase();
				result.forEach(function(column) {
					var name = column.first_name.toLowerCase() + ' ' + column.last_name.toLowerCase();
					if(name.search(value)>-1 || column.email.search(value)>-1) {
						filtered_result.push(column);
					}
				});
				return reply(filtered_result);
			}); 
		}
	}
};

module.exports = user_controller;
