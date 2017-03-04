export function checkStatus(resp) {
  if (resp.status >= 200 && resp.status < 300) {
    return resp;
  }
  const error = new Error(resp.statusText);
  error.resp = resp;
  error.code = resp.status;
  throw error;
}

export function handleNetworkError(err) {
  console.log(err);
}