# newsletter

    npm install newsletter

Simple pub/sub implementation.

## API

To create publisher instance use `Newsletter` constructor (see Usage). Instance implements next interface:

- `publish` - invokes all listeners and pass some received data to them
- `subscribe` - adds new listener (function) and returns subscription handling instance

## Usage

```javascript
// get newsletter
import Newsletter from 'newsletter';

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

The project is licensed under the [MIT](https://github.com/alexeyraspopov/newsletter/blob/master/LICENSE) license.
