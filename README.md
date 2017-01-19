## Why do you need this?

Let’s say you have a web app and you want to retry a network request in case it fails for 3 times before you present an error screen to the user. Or anytime you have a function that returns a promise, and you want to retry it few times if it fails.

### Example usage

Here I’m using axios library to make network requests.

```javascript
// Step 1, create a function that will generate the promise that you’re looking for
var promiseGeneratorFn = () => axios('http://google.com');

// Step 2, execute it and specify number of retries you want in case promise fails
retryPromise(promiseGeneratorFn, 3)
  .then((response) => {
    // do some stuff
  })
  .catch((error) => {
    // show error screen?
  });
```

#### Api
```javascript
retryPromise(promiseGeneratorFn, maxRetries);
```
It receives two arguments, the first one is a function that generates the promise (see Step 1), the second is maximum number of retries in case promise fails. It returns a single promise that will succeed as soon as the original promise succeeds in any retry attempts, or fail if all retry attempts fail.

