'use strict';

const Joi = require('joi');
const Controllers = require('../Controllers/index.js');

var user_routes = [
	{
		method: 'POST',
		path: '/user/login',
		config: {
			tags: ['api'],
			description: 'user login',
			notes: 'User login by email and password.',
			validate: {
				payload: {
					username: Joi.string().email().required(),
					password: Joi.string().min(8).required()
				}
			}
		},
		handler: Controllers.user_login
	},
	{
		method: 'POST',
		path: '/user/register',
		config: {
			tags: ['api'],
			description: 'register user',
			notes: 'Register new user.',
			validate: {
				payload: {
					first_name: Joi.string().required(),
					last_name: Joi.string().required(),
					email: Joi.string().email().required(),
					mobile: Joi.string().min(10).max(10).required(),
					password: Joi.string().min(8).required()
				}
			}
		},
		handler: Controllers.user_register
	},
	{
		method: 'GET',
		path: '/user/search/{value}',
		config: {
			tags: ['api'],
			description: 'search users',
			notes: 'Search for all registered users.',
			validate: {
				params: {
					value: Joi.string().min(1).description('Find people').required()
				}
			}
		},
		handler: Controllers.user_search
	}
];

module.exports = user_routes;
