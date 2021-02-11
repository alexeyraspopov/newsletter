export default class Newsletter<Data> {
  subscribe(callback: (Data) => void | Promise<void>): Subscription;
  publish(data: Data): void;
}

class Subscription {
  dispose(): void;
}
