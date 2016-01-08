'use strict';

const base = {
	connection: {
		host: 'localhost',
		port: 80
	},
	token: {
		secret: 'getAccessTokenKey' + new Date(),
		options: {
			algorithm: 'HS256',
			expiresIn: 1800 
		}
	},
	bcrypt: {
		rounds: 10
	}
};

module.exports = base;
