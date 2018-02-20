import Newsletter from '../Newsletter';

function createContext() {
  let signal = new Newsletter();
  let value = 13;
  let listener = jest.fn();
  return { signal, value, listener };
}

describe('Newsletter', () => {
  it('should publish value', () => {
    let { signal, value, listener } = createContext();

    signal.subscribe(listener);
    signal.publish(value);

    expect(listener).toHaveBeenCalledWith(value);
  });

  it('should return unsubcribe function', () => {
    let { signal, value, listener } = createContext();

    let unsubcribe = signal.subscribe(listener);
    unsubcribe();
    signal.publish(value);

    expect(listener).not.toHaveBeenCalled();
  });

  it('should remove callback', () => {
    let { signal, value, listener } = createContext();

    signal.subscribe(listener);
    signal.unsubscribe(listener);
    signal.publish(value);

    expect(listener).not.toHaveBeenCalled();
  });

  it('should add callback only once', () => {
    let { signal, value, listener } = createContext();

    signal.subscribe(listener);
    signal.subscribe(listener);
    signal.publish(value);

    expect(listener.mock.calls.length).toBe(1);
  });

  it('should call a callback only once', () => {
    let { signal, value, listener } = createContext();

    signal.subscribe(listener, { once: true });
    signal.publish(value);
    signal.publish(value);

    expect(listener.mock.calls.length).toBe(1);
  });

  it('should call a callback more than once', () => {
    let { signal, value, listener } = createContext();

    signal.subscribe(listener, { once: false });
    signal.publish(value);
    signal.publish(value);

    expect(listener.mock.calls.length).toBe(2);
  });
});
