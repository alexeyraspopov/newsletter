declare module 'newsletter' {
  export default class Newsletter {
    subscribers: Set<Function>;
    subscribe(callback: Function, options?: { once: boolean }): Function;
    unsubscribe(callback: Function): void;
    publish(data: any): void;
  }
}
