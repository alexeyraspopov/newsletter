import { jest } from '@jest/globals';
import { Newsletter } from './Newsletter';

test('basic subscribers management cases', () => {
  let signal = new Newsletter();
  let value = 13;
  let listener = jest.fn();

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

  expect(listener).toHaveBeenCalledWith(value);
  expect(listener).toHaveBeenCalledTimes(5);
});
