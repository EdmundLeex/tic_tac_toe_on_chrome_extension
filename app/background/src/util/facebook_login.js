import { checkStatus, defaultHeaders, BASE_URL } from './util';
const FB_BASE_URL = 'https://www.facebook.com/v2.8/dialog/oauth?';
const CLIENT_ID = '297717873979239';
const REDIRECT_URI = 'https://www.facebook.com/connect/login_success.html';
const SCOPE = 'email'

export const FB_OAUTH_URI = `${FB_BASE_URL}client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`;

export function fbLogin() {
  return createFbOauthTab()
  .then(addFbOauthTabListener)
  .then(postFbLogin);
}

function createFbOauthTab() {
  return new Promise(resolve => {
    chrome.tabs.create({
      url: FB_OAUTH_URI
    }, resolve);
  })
}

function addFbOauthTabListener() {
  return new Promise(resolve => {
    chrome.tabs.onUpdated.addListener(handleFbResp(resolve));
  });
}

function handleFbResp(callback) {
  return function _handleFbResp(tabId, tabObj) {
    if (typeof tabObj.url !== 'undefined') {
      let matchedCode = tabObj.url.match(/code=(.+)/);
      if (matchedCode) {
        chrome.tabs.onUpdated.removeListener(_handleFbResp);
        chrome.tabs.remove(tabId);

        callback(matchedCode[1]);
      }
    }
  }
}

function postFbLogin(accessToken) {
  return fetch(`${BASE_URL}/fblogin`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({code: accessToken})
  })
  .then(checkStatus)
  .then(res => res.json());
}
