module.exports = function(){
	var listeners = [];

	function unsubscribe(callback){
		return function(){
			var index = listeners.indexOf(callback);

			if(index > -1){
				listeners.splice(index, 1);
			}
		};
	}

	function noop(){}

	return {
		subscribe: function(callback){
			if(listeners.indexOf(callback) < 0){
				listeners.unshift(callback);

				return unsubscribe(callback);
			}

			return noop;
		},
		publish: function(data){
			var index = listeners.length;

			while(--index >= 0){
				listeners[index](data);
			}
		}
	}
};
