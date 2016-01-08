'use strict';

const Mongoose = require('./mongo.js');
const Schema = Mongoose.Schema;

var database_queries = {
	track_count: new Schema({
		table: {type: String, unique: true},
		count: {type: Number, default: 0}
	})
};

module.exports = database_queries;
