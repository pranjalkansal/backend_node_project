'use strict;'

var UserSchema = require('./userSchema.js');
var QueriesSchema = require('./queriesSchema.js');

module.exports = {query: QueriesSchema, user: UserSchema};
