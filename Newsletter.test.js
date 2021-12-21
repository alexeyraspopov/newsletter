import assert, { CallTracker } from 'assert/strict'
import { Newsletter } from './Newsletter.js';

let signal = new Newsletter();
let value = 13;
let tracker = new CallTracker();
let values = [];
let listener = tracker.calls(values.push.bind(values), 5);

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

tracker.verify();
assert.deepEqual(values, [value, value, value, value, value]);
