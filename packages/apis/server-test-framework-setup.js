'use strict';

require('jasmine-check').install();

/* istanbul ignore next */
afterAll((done) => {
	require('./packages/apis/server.js').tearDownApis((err) => {
		if (err) {
			console.error('tearDownApis fail', err);
		}
		// done(); //NOTE normally would be done here, see note below
	});
	//NOTE call done callback before the teardown is complete,
	// as it is *not* necessary for it to *complete* prior to advancing to the next test files
	// This is done to decrease the total run time of the entire suite of tests
	// by minimising the time spent cleaning up between one file and the next
	done();
});
