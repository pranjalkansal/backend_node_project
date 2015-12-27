const base = {
	connection: {
		host: 'localhost',
		port: 8080
	},
	token: {
		secret: 'getAccessTokenKey' + new Date(),
		expires: 1800
	},
	bcrypt: {
		rounds: 10
	}
};

module.exports = base;
