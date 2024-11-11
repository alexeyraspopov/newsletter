/** Class that creates pub/sub instances */
export class Newsletter<Data> {
  /** Adds new listener and return subscription instance */
  subscribe(callback: (data: Data) => void | Promise<void>, signal?: AbortSignal): Subscription;
  /** Invokes all current listeners and send data to them */
  publish(data: Data): void;
}

declare class Subscription {
  /** Removes listener */
  dispose(): void;
}
