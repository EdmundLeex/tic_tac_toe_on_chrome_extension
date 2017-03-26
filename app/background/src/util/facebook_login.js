import { checkStatus, defaultHeaders, BASE_URL } from './util';
const FB_BASE_URL = 'https://www.facebook.com/v2.8/dialog/oauth?';
const CLIENT_ID = '297717873979239';
const REDIRECT_URI = 'https://www.facebook.com/connect/login_success.html';
const SCOPE = 'email'

export const FB_OAUTH_URI = `${FB_BASE_URL}client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`;

export function handleFBResp(fbTabId, tabId, tabObj, _) {
  if (fbTabId === tabId && typeof tabObj.url !== 'undefined') {
    let matchedCode = tabObj.url.match(/code=(.+)/);
    if (matchedCode) {
      fbLogin(matchedCode[1]);

      chrome.tabs.onUpdated.removeListener(handleFBResp);
      chrome.tabs.remove(fbTabId);
    }
  }
}

export function fbLogin(code) {
  return fetch(`${BASE_URL}/fblogin`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({code: code})
  })
  .then(checkStatus)
  .then(res => res.json());
}