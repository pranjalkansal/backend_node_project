const Hapi = require('hapi');
const Config = require('./Config/index.js');
const Plugins = require('./Plugins/index.js');
const Routes = require('./Routes/index.js');

const server = new Hapi.Server();

server.connection(Config.Base.connection);

server.register(Plugins, function(error) {
	error?(server.log(['error'], 'Plugins loading error')):(server.log(['start'], 'Plugins loaded'));
});

Routes.forEach(function(route) {
	server.route(route);
});

server.route({
	method: 'GET',
	path: '/user/hello',
	handler: function(request, reply) {
		return reply('Hello World!!');
	},
	config: {
		tags: ['api'],
		description: 'Hello World',
		notes: 'Get Greeted'
	}
});

server.start(function(error) {
	if(error) {
		console.log(error);
	}
	else {
		console.log('Server running at: ' + server.info.uri);
	}
});