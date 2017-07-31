'use strict';

const express = require('express');

const server = express();

const apisConfig = {
	'multiway-switch': {
		available: true,
	},
};

const apisForThisDeployment = Object.keys(apisConfig)
	.filter((apiName) => {
		const apiConfig = apisConfig[apiName];
		return apiConfig && apiConfig.available === true;
	})
	.map((apiName) => {
		const apiModule = require(`../${apiName}-api/${apiName}-api.js`);
		return {
			name: apiName,
			module: apiModule,
		};
	});

const allApiMiddleware = [];

apisForThisDeployment
	.forEach((api) => {
		const apiRouter = api.module.setUp();
		server.use(allApiMiddleware, apiRouter);
	});

server.on('exit', tearDownServer);
process.on('SIGTERM', tearDownServer);

/* istanbul ignore next */
function tearDownServer () {
	tearDownApis(() => {
		server.close(() => {
			console.log('server closed');
		});
	});
}

/* istanbul ignore next */
function tearDownApis (errback) {
	const righto = require('righto');
	const tasks = apisForThisDeployment
		.map((api) => {
			return righto(api.module.tearDown);
			// api.module.tearDown();
		});
	righto.all(tasks)((err) => {
		if (err) {
			console.log('tear down apis fail');
			console.error(err);
		} else {
		}
		errback(err);
	});
}

server.tearDownApis = tearDownApis;

module.exports = server;
