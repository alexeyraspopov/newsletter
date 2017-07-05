class Newsletter {
	constructor() {
		this.subscribers = new Set();
	}

	subscribe(callback) {
		this.subscribers.add(callback);
		return () => this.unsubscribe(callback);
	}

	unsubscribe(callback) {
		this.subscribers.delete(callback);
	}

	publish(data) {
		for(const subscriber of this.subscribers) {
			subscriber(data);
		}
	}
}

module.exports = Newsletter;
