import { mock, test } from "node:test";
import assert from "node:assert/strict";
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

  assert.strictEqual(listener.mock.calls.length, 5);
  assert.deepStrictEqual(
    listener.mock.calls.flatMap((call) => call.arguments),
    [value, value, value, value, value],
  );
});
