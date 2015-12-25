const Config = require('../Config/index.js');
const Mongoose = require('mongoose');

Mongoose.connect('mongodb://localhost/backend_project', function(error) {
	if(error)
		console.log(Config.Database.connection.error);
	else
		console.log(Config.Database.connection.success);
});

module.exports = Mongoose;