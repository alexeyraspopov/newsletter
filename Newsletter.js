export class Newsletter {
  constructor() {
    this.head = { prev: null, next: null };
    this.tail = { prev: null, next: null };
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  subscribe(callback) {
    let node = { value: callback, prev: this.tail.prev, next: this.tail };
    this.tail.prev.next = node;
    this.tail.prev = node;

    return {
      dispose() {
        node.prev.next = node.next;
        node.next.prev = node.prev;
      },
    };
  }

  publish(data) {
    let cursor = this.head;
    while ((cursor = cursor.next) !== this.tail) {
      let callback = cursor.value;
      callback(data);
    }
  }
}
