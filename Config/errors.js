var request_feedback = {
	user: {
		login: {
			error: 'User not registered!!',
			success: 'User found!!'
		},
		register: {
			error: 'Email is already registered!!',
			success: 'User registered successfully!!'
		}
	},
	token: {
		create: {
			error: 'Error creating token!!',
			success: 'Access token successfully created!!'
		}
	},
	bcrypt: {
		salt: {
			error: 'Error creating Bcrypt salt!!',
			success: 'Bcrypt - salt created!! '
		},
		hash: {
			error: 'Error creating Bcrypt hash!!',
			success: 'Bcrypt - hash created!! '
		},
		compare: {
			error: 'Error occured while comparing hash!!',
			success: 'Hash successfully compared!!'
		}
	},
	server: {
		error: 'Server error occured!!'
	}
};

module.exports = request_feedback;
