'use strict';

const schwag = require('schwag');
const express = require('express');

schwag.addSchema(require('./multiway-switch-api.json'));

module.exports = {
	setUp,
	tearDown,
};

function setUp () {
	const api = express.Router();
	require('./create-light.js').expressRegister(api);
	return api;
}

/* istanbul ignore next */
function tearDown (errback) {
	require('./persist').wipeAll();
	errback();
}
