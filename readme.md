# newsletter

Simple pub/sub implementation.

## Install

```bash
$ npm install newsletter
```

```bash
$ component install alexeyraspopov/newsletter
```

```bash
$ bower install newsletter
```

## API

To create publisher instance call factory function (see Usage). Instance implements next interface (similar to Observer):

 * `publish` - invokes all listeners and pass some received data to them
 * `subscribe` - adds new listener (function) and returns "unsubscribe" function
 * `unsubscribe` - removes previously added listener

## Usage

```javascript
// get newsletter
var Newsletter = require('newsletter');

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
var unsubscribe = signal.subscribe(function(){ ... });

// remove listener
unsubscribe();
```

```javascript
var listener = function(){ ... };

// add listener
signal.subscribe(listener);

// remove listener
signal.unsubscribe(listener);
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License) (c) Alexey Raspopov
