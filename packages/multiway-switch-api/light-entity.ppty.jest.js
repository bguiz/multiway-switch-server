'use strict';

const lightEntity = require('./light-entity.js');

describe('[light entity]', () => {

	check.it('flip switch', gen.array(gen.boolean, { minSize: 1 }), (states) => {
		const switchIndex = Math.floor(Math.random() * states.length);
		const switchStates = states.map((state) => (state ? 'UP' : 'DOWN'));
		const light = {
			switchStates,
		};
		const newSwitchStates = lightEntity.flipSwitch(light, switchIndex);
		const expectedSwitchStates = states.map((state, index) => {
			if (index !== switchIndex) {
				return (state ? 'UP' : 'DOWN');
			} else {
				return (state ? 'DOWN' : 'UP');
			}
		});
		expect(newSwitchStates).toEqual(expectedSwitchStates);
	});

	check.it('get state', gen.array(gen.boolean, { minSize: 1 }), (states) => {
		const switchStates = states.map((state) => (state ? 'UP' : 'DOWN'));
		const light = {
			switchStates,
		};
		const onOrOff = (lightEntity.getState(light) === 'ON');
		const expectedOnOrOff = states.reduce((acc, val) => (acc + (+val)), 0) % 2 === 0;
		expect(onOrOff).toEqual(expectedOnOrOff);
	});

});
