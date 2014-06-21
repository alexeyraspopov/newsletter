'use strict';

function unsubscribe(listeners, callback){
	return function(){
		var index = listeners.indexOf(callback);

		if(index > -1){
			listeners.splice(index, 1);
		}
	};
}

function noop(){}

module.exports = function(){
	var listeners = [];

	return {
		subscribe: function(callback){
			if(listeners.indexOf(callback) < 0){
				listeners.unshift(callback);

				return unsubscribe(listeners, callback);
			}

			return noop;
		},
		publish: function(data){
			var index = listeners.length;

			while(--index >= 0){
				listeners[index](data);
			}
		}
	};
};
