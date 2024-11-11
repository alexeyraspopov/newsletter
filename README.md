# newsletter

    npm install newsletter

Simple pub/sub implementation.

## ESM Package

Starting from `v4.0` this package fully moved to ES Modules and ES2015 code. This means no more
build step before publishing to NPM.

Ideally you shouldn't spot any difference, but in case you face any issues, see
[this useful article](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#how-can-i-move-my-commonjs-project-to-esm).

You can also downgrade to `v3.x` to use all the same functionality, precompiled to ES5.

## API

To create publisher instance use `Newsletter` constructor (see Usage). Instance implements next
interface:

- `publish` - invokes all listeners and pass some received data to them
- `subscribe` - adds new listener (function) and returns subscription handling instance

## Usage

```javascript
// get newsletter
import { Newsletter } from "newsletter";

// create instance
var signal = new Newsletter();

// subscribe notifications
var subscription = signal.subscribe((data) => console.log(data));

// publish some data to subscribers
signal.publish(13);

// remove listener
subscription.dispose();
```

There is a way to subscribe to a single update

```javascript
var signal = new Newsletter();

// subscribe to a single update
var subscription = signal.subscribe((data) => {
  subscription.dispose();
  console.log(data);
});

// will call a listener and remove it
signal.publish(13);

// no listeners called
signal.publish(14);
```

[`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) API can be used to
dispose a subscription:

```javascript
var pubsub = new Newsletter();
var ctrl = new AbortController();

// subscribe to a single update, pass AbortSignal as second param
pubsub.subscribe((data) => {
  console.log(data);
}, ctrl.signal);

// will call a listener, as expected
pubsub.publish(13);

// abort controller can be aborted at any occasion
ctrl.abort();

// no listeners called
pubsub.publish(14);
```

The project is licensed under the [MIT](./LICENSE) license.
