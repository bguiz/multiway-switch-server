'use strict';

const store = new Map();

module.exports = {
	wipeAll,
	get,
	set,
	del,
	store,
};

/* destroy everything */
function wipeAll() {
	store.clear();
}

/* get by ID */
function get(entity, id) {
	const entities = store.get(entity);
	if (!entities) {
		return undefined;
	}
	const item = entities.get(id);
	return item;
}

/* insert or update (shallow merge) */
function set(entity, id, value) {
	let entities = store.get(entity);
	if (!entities) {
		entities = new Map();
		store.set(entity, entities);
	}
	const prevItem = entities.get(id);
	const updatedItem = Object.assign({}, prevItem, value);
	//FIXME this is a bug
	// store.set(id, updatedItem);
	entities.set(id, updatedItem);
	return updatedItem;
}

/* destroy by ID */
function del(entity, id) {
	const entities = store.get(entity);
	if (!entities) {
		return undefined;
	}
	const item = entities.get(id);
	entities.delete(id);
	return item;
}
