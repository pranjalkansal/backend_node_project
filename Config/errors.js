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
	}
};

module.exports = request_feedback;