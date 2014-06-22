'use strict';

function unsubscribe(subscribers, callback){
	return function(){
		var index = subscribers.indexOf(callback);

		if(index > -1){
			subscribers.splice(index, 1);
		}
	};
}

function noop(){}

module.exports = function(firstPublication){
	var subscribers = [];

	return {
		subscribe: function(callback, immediateCall){
			if(subscribers.indexOf(callback) < 0){
				subscribers.unshift(callback);

				if(immediateCall){
					callback(firstPublication);
				}

				return unsubscribe(subscribers, callback);
			}

			return noop;
		},
		publish: function(data){
			var index = subscribers.length;

			while(--index >= 0){
				subscribers[index](data);
			}
		}
	};
};
