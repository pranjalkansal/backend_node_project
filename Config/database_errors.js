'use strict';

var database = {
	connection: {
		error: 'Oops, error in connecting database!!',
		success: 'Database connection established!!'
	},
	entry: {
		error: 'Error occured while making entry in database due to: ',
		success: 'Database entry created'
	},
	query: {
		error: 'Error occured while executing database query!!',
		success: 'Database query executed successfully!!'
	}
};

module.exports = database;
