'use strict';

module.exports = function() {
	var subscribers = [];

	return {
		subscribe: function(callback) {
			return subscribe(subscribers, callback);
		},
		unsubscribe: function(callback) {
			unsubscribe(subscribers, callback);
		},
		publish: function(data) {
			publish(subscribers, data);
		}
	};
};

function unsubscribe(subscribers, callback) {
	var index = subscribers.indexOf(callback);

	if (index > -1) {
		subscribers.splice(index, 1);
	}
}

function publish(subscribers, data) {
	var index = subscribers.length;

	while (--index >= 0) {
		subscribers[index](data);
	}
}

function subscribe(subscribers, callback) {
	if (subscribers.indexOf(callback) < 0) {
		subscribers.unshift(callback);

		return function() { unsubscribe(subscribers, callback); };
	}

	return noop;
}

function noop() {}
