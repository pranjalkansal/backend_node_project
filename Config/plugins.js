'use strict';

const Package = require('../package.json');

const swaggerOptions = {
	apiVersion: Package.version,
	pathPrefixSize: 1
};

module.exports = swaggerOptions;
