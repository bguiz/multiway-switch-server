'use strict';

const schwag = require('schwag');

const lightEntity = require('./light-entity.js');
const persist = require('./persist.js');

const routeInfo = {
	schemaName: 'mutliwaySwitchApi',
	routePath: '/api/multiway-switch/v1/create-light',
	routeVerb: 'get',
};
const schwagExpress = schwag.express(routeInfo);

function createLightGetApi (input, errback) {
	const output = {
		status: 200,
		headers: new Map(),
		body: undefined,
	};
	let [ lightId, numSwitches ] = [
		input.params.get('lightId'),
		input.params.get('numSwitches'),
	];
	if (numSwitches !== 2) {
		input.errors.push();
		output.status = 400;
		output.body = {
			code: 400001,
			message: 'Only supports 2 switches.',
		};
		errback(undefined, output);
		return;
	}
	const existingLight = persist.get('light', lightId);
	if (existingLight) {
		input.errors.push();
		output.status = 400;
		output.body = {
			code: 400002,
			message: 'Light with this ID already exists.',
		};
		errback(undefined, output);
		return;
	}
	// Input is valid, create a new light and accompanying switches
	const newLight = {
		switchStates: [false, false],
	};
	persist.set('light', lightId, newLight);
	output.body = lightEntity.create(lightId, 2);
	errback(undefined, output);
	return;
}

function createLightGetExpress (req, res, next) {
	createLightGetApi(res.locals.input, (err, output) => {
		// console.log('createLightGetExpress after createLightGetApi');
		if (err) {
			winston.error(err);
		}
		res.locals.output = output;
		next(err);
	});
}

function createLightGetRegisterExpress (server) {
	server[routeInfo.routeVerb](
		schwagExpress.path,
		schwagExpress.request,
		createLightGetExpress,
		schwagExpress.response);
}

module.exports = {
	api: createLightGetApi,
	expressHandler: createLightGetExpress,
	expressRegister: createLightGetRegisterExpress,
};
