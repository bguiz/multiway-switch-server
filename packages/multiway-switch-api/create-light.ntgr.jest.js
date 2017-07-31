'use strict';

const serverTest = require('../apis/server-test.js');

// LET THERE BE LIGHT!!
describe('[create light]', () => {

	it('should create a new light with switches', (done) => {
		serverTest.getRequest()
			.get('/api/multiway-switch/v1/create-light')
			.query({
				lightId: 1,
				numSwitches: 2,
			})
			.send()
			.end((err, response) => {
				expect(err).not.toEqual(expect.anything());
				expect({
					status: response.status,
					body: response.body,
				}).toMatchSnapshot();
				done();
			});
	});

	//FIXME add this - persistence test

	it('should have persisted newly created light', (done) => {
		const persist = require('./persist.js');
		const existingLight = persist.get('light', 1);
		expect(existingLight).toEqual(expect.anything());
		expect(existingLight).toMatchSnapshot();
		done();
	});

	// Cover the error cases

	//FIXME add these - error code coverage
	it('should not create a new light when number of switches is unsupported', (done) => {
		serverTest.getRequest()
			.get('/api/multiway-switch/v1/create-light')
			.query({
				lightId: 2,
				numSwitches: 3,
			})
			.send()
			.end((err, response) => {
				expect(err).not.toEqual(expect.anything());
				expect({
					status: response.status,
					body: response.body,
				}).toMatchSnapshot();
				done();
			});
	});

	it('should not create a new light ID has conflict', (done) => {
		serverTest.getRequest()
			.get('/api/multiway-switch/v1/create-light')
			.query({
				lightId: 1,
				numSwitches: 2,
			})
			.send()
			.end((err, response) => {
				expect(err).not.toEqual(expect.anything());
				expect({
					status: response.status,
					body: response.body,
				}).toMatchSnapshot();
				done();
			});
	});

	// parametric should not create new lights based on numSwitches

	//FIXME add these - parametric tests
	[-2,0,1,3,10, 2].forEach((numSwitches, idx) => {

		it(`should not create a new light with ${numSwitches} switches`, (done) => {
			const lightId = 100 + idx;
			serverTest.getRequest()
				.get('/api/multiway-switch/v1/create-light')
				.query({
					lightId,
					numSwitches,
				})
				.send()
				.end((err, response) => {
					expect(err).not.toEqual(expect.anything());
					expect({
						status: response.status,
						body: response.body,
					}).toMatchSnapshot();
					done();
				});
		});

	});

});
