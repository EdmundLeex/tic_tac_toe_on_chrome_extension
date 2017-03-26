export const BASE_URL = 'http://localhost:3000';

export const defaultHeaders = {
  'Access-Control-Allow-Origin': BASE_URL,
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Origin': BASE_URL,
  'Host': BASE_URL
};

export function checkStatus(resp) {
  if (resp.status >= 200 && resp.status < 300) {
    return resp;
  }
  const error = new Error(resp.statusText);
  error.resp = resp;
  error.code = resp.status;
  return Promise.reject(error);
}

export function handleNetworkError(err) {
  console.log(err);
}