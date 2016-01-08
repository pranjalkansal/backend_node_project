'use strict';

const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const HapiSwaggerOptions = require('../Config/index.js');

var swaggerOptions = {
	apiVersion: HapiSwaggerOptions.Plugins.apiVersion,
	pathPrefixSize: HapiSwaggerOptions.Plugins.pathPrefixSize
};

var swagger = [
	{
		register: Inert
	},
	{
		register: Vision
	},
	{
		register: HapiSwagger,
		options: swaggerOptions
	}
];

module.exports = swagger;
