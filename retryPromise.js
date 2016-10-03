// @flow

function tryPromise(promiseGeneratorFn, reject, resolve, maxRetries, failedReason) {
    if (maxRetries === 0) {
        reject(failedReason);
    }
    else {
        var p = promiseGeneratorFn();
        p.then(function (response) {
            resolve(response);
        });
        p.catch(function (error) {
            tryPromise(promiseGeneratorFn, reject, resolve, maxRetries - 1, error);
        });
    }
}

export default function retryPromise(promiseGeneratorFn: () => Promise<*>, maxRetries: number) : Promise<*> {
    return new Promise(function (resolve, reject) {
        tryPromise(promiseGeneratorFn, reject, resolve, maxRetries, undefined);
    });
}
