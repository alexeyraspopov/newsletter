export default class Newsletter {
  constructor() {
    this.subscribers = new Set();
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.unsubscribe(callback);
  }

  subscribeOnce(callback) {
    const wrapper = (data) => {
      callback(data);
      this.unsubscribe(wrapper);
    };

    return this.subscribe(wrapper);
  }

  unsubscribe(callback) {
    this.subscribers.delete(callback);
  }

  publish(data) {
    for (const subscriber of this.subscribers) {
      subscriber(data);
    }
  }
}
