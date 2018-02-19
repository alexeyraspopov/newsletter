import Newsletter from '../Newsletter';

describe('Newsletter', function() {
  var subscription, value, subscriber;

  beforeEach(function() {
    subscription = new Newsletter();
    value = 13;
    subscriber = { method: function() {} };

    spyOn(subscriber, 'method');
  });

  it('should publish value', function() {
    subscription.subscribe(subscriber.method);
    subscription.publish(value);

    expect(subscriber.method).toHaveBeenCalledWith(value);
  });

  it('should return unsubcribe function',  function() {
    var unsubcribe = subscription.subscribe(subscriber.method);

    expect(typeof unsubcribe).toBe('function') ;

    unsubcribe();
    subscription.publish(value);

    expect(subscriber.method).not.toHaveBeenCalled();
  });

  it('should remove callback', function() {
    subscription.subscribe(subscriber.method);
    subscription.unsubscribe(subscriber.method);

    subscription.publish(value);

    expect(subscriber.method).not.toHaveBeenCalled();
  });

  it('should add callback only once', function() {
    var counter = 0, inc = function() { counter++; };

    subscription.subscribe(inc);
    subscription.subscribe(inc);
    subscription.publish(value);

    expect(counter).toBe(1);
  });

  it('should call a callback only once', function() {
    var counter = 0, inc = function() { counter++; };

    subscription.subscribe(inc, { once: true });
    subscription.publish(value);
    subscription.publish(value);

    expect(counter).toBe(1);
  });

  it('should call a callback more than once', function() {
    var counter = 0, inc = function() { counter++; };

    subscription.subscribe(inc, { once: false });
    subscription.publish(value);
    subscription.publish(value);

    expect(counter).toBe(2);
  });
});
