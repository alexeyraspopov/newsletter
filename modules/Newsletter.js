export default class Newsletter {
  constructor() {
    this.subscribers = new Set();
  }

  subscribe(callback, options = { once: false }) {
    this.subscribers.add(callback);

    if (options.once) {
      let hook = this.subscribers.add(() => {
        this.unsubscribe(callback);
        this.unsubscribe(hook);
      });
    }

    return () => this.unsubscribe(callback);
  }

  unsubscribe(callback) {
    this.subscribers.delete(callback);
  }

  publish(data) {
    for (let subscriber of this.subscribers) {
      subscriber(data);
    }
  }
}
