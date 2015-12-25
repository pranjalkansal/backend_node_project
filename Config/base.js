const base = {
	connection: {
		host: 'localhost',
		port: 80
	},
	token: {
		secret: 'getAccessTokenKey' + new Date(),
		expires: 1800
	}
};

module.exports = base;