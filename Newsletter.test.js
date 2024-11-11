import { mock, test } from "node:test";
import { equal, deepEqual } from "node:assert/strict";
import { Newsletter } from "./Newsletter.js";

test("listeners invocation", () => {
  let signal = new Newsletter();
  let value = 13;
  let listener = mock.fn();

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

  equal(listener.mock.calls.length, 5);
  deepEqual(
    listener.mock.calls.flatMap((call) => call.arguments),
    [value, value, value, value, value],
  );
});

test("abort signal", () => {
  let nl = new Newsletter();
  let ctl = new AbortController();

  let listener = mock.fn();
  nl.subscribe(listener, ctl.signal);

  nl.publish(0);
  equal(listener.mock.calls.length, 1);

  nl.publish(0);
  equal(listener.mock.calls.length, 2);

  ctl.abort();
  nl.publish(0);
  equal(listener.mock.calls.length, 2);
});
