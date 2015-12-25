const Mongoose = require('./mongo.js');
const Schema = Mongoose.Schema;

var user = {
	login: new Schema({
		username: {type: String, unique: true},
		password: String
	}),
	register: new Schema({
		first_name: {type: String, required: true},
		last_name: {type: String, required: true},
		email: {type: String, required: true, unique: true, index: true},
		mobile: {type: String, required: true, unique: true},
		password: {type: String, required: true}
	})
};
module.exports = user;