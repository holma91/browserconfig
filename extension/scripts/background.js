chrome.runtime.onMessageExternal.addListener(function (
  request,
  sender,
  sendResponse
) {
  console.log('request', request);
  console.log('sender', sender);

  if (request.type === 'set') {
    // save in chrome storage
    chrome.storage.local.set({ cid: request.cid }, function () {
      console.log('cid is set to ' + request.cid);
    });
  } else if (request.type === 'get') {
    chrome.storage.local.get(['cid'], function (result) {
      console.log('cid currently is ' + result.cid);
      sendResponse({ cid: result.cid });
    });
  }
});
