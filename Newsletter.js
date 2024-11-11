export class Newsletter {
  constructor() {
    this.head = { prev: null, next: null };
    this.tail = { prev: null, next: null };
    (this.head.next = this.tail).prev = this.head;
  }

  subscribe(callback, signal) {
    if (signal != null && signal.aborted) return;
    let node = { value: callback, prev: this.tail.prev, next: this.tail };
    this.tail.prev = this.tail.prev.next = node;
    let dispose = () =>
      node != null ? (((node.prev.next = node.next).prev = node.prev), (node = null)) : null;
    if (signal != null) signal.addEventListener("abort", dispose, { once: true });
    return { dispose };
  }

  publish(data) {
    let cursor = this.head;
    while ((cursor = cursor.next) !== this.tail) {
      let callback = cursor.value;
      callback(data);
    }
  }
}
