export const REQUEST_TIMEOUT_MS = 30000;

const _checkStatus = (res) => {
  if (res.ok) {
    return res[res.status === 204 ? 'text' : 'json']();
  } else if (res.status === 401) {
    throw new Error('Unauthorized');
  } else {
    const error = new Error(res.statusText);
    error.response = res;
    throw error;
  }
};

export function timedRequest(ms, promise) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('Request Timeout'));
    }, ms);
    promise.then(
      (res) => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      (err) => {
        clearTimeout(timeoutId);
        reject(err);
      }
    );
  });
}

export function apiSkeleton(url, options, onRequestSuccess, onRequestFail) {
  if (!url) onRequestFail(new Error('Request url is a required field'));
  if (!options) onRequestFail(new Error('Request options is a required field'));
  const reqOptions = {
    mode: 'cors',
    ...options
  };
  timedRequest(REQUEST_TIMEOUT_MS, fetch(url, reqOptions))
    .then(_checkStatus)
    .then((res) => {
      onRequestSuccess(res);
    })
    .catch((error) => {
      onRequestFail(error);
    });
}
