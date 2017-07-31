'use strict';

// Create a new light entity
function create (lightId, numSwitches) {
	return {
		lightId,
		//FIXME swap these around - hardcoded -> dynamic switchStates + lightState
		// switchStates: ['UP', 'DOWN'],
		switchStates: Array(numSwitches).fill('UP'),
		lightState: 'OFF',
	};
}

// Change the switch at the specified index and return the new switch states
function flipSwitch (light, switchIndex) {
	const states = light.switchStates;
	const nextStates = [
		...states.slice(0, switchIndex),
		((states[switchIndex] === 'UP') ? 'DOWN' : 'UP'),
		...states.slice(switchIndex + 1),
	];
	return nextStates;
}

// Work out what the state of the light should be based on the current switch states
function getState (light) {
	const states = light.switchStates;
	//FIXME always OFF atm
	return 'OFF';
	// const upCount = states.r ? 'ON' : 'OFF');
}

module.exports = {
	create,
	flipSwitch,
	getState,
};
