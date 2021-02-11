import { Newsletter } from '../Newsletter';

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

  it('should publish to multiple listeners', () => {
    let { signal, value, listener } = createContext();

    let subscriptionA = signal.subscribe(listener);
    let subscriptionB = signal.subscribe(listener);
    let subscriptionC = signal.subscribe(listener);
    let subscriptionD = signal.subscribe(listener);
    let subscriptionE = signal.subscribe(listener);

    signal.publish(value);

    subscriptionA.dispose();
    subscriptionE.dispose();
    subscriptionC.dispose();
    subscriptionB.dispose();
    subscriptionD.dispose();

    signal.publish(value);

    expect(listener).toHaveBeenCalledTimes(5);
  });

  it('should return subscription handler', () => {
    let { signal, value, listener } = createContext();

    let subscription = signal.subscribe(listener);
    subscription.dispose();
    signal.publish(value);

    expect(listener).not.toHaveBeenCalled();
  });
});
