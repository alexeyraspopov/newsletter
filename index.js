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

    this.subscribers.add(wrapper);
    return () => this.unsubscribe(wrapper);
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
