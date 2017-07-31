'use strict';

const supertest = require('supertest');

module.exports = {
	getRequest,
};

function getRequest () {
	return supertest.agent(require('./server.js'));
}
