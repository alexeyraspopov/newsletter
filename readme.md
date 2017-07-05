# newsletter

Simple pub/sub implementation.

## Install

```bash
$ npm install newsletter
```

## API

To create publisher instance use `Newsletter` constructor (see Usage). Instance implements next interface:

 * `publish` - invokes all listeners and pass some received data to them
 * `subscribe` - adds new listener (function) and returns "unsubscribe" function
 * `unsubscribe` - removes previously added listener

## Usage

```javascript
// get newsletter
import Newsletter from 'newsletter';

// create instance
var signal = new Newsletter();

// subscribe notifications
signal.subscribe((data) => console.log(data));

// publish some data to subscribers
signal.publish(13);
```

There are two ways to remove listeners

```javascript
// add listener and get "unsubscribe" function
var unsubscribe = signal.subscribe(() => ...);

// remove listener
unsubscribe();
```

```javascript
function listener() { ... }

// add listener
signal.subscribe(listener);

// remove listener
signal.unsubscribe(listener);
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License) (c) Alexey Raspopov
