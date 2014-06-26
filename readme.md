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

To create publisher instance invoke factory (see Usage). Instance implement next interface (similar to Observer):

 * `publish` - invokes all subscribers and pass some received data to them
 * `subscribe` - adds new subscriber (function) and returns "unsubscribe" function

## Usage

```javascript
// get newsletter
var newsletter = require('newsletter');

// create instance
var signal = newsletter();

// subscribe notifications
signal.subscribe((data) => console.log(data));

// publish some data to subscribers
signal.publish(13);
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License) (c) Alexey Raspopov
