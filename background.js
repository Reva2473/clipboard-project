chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ clipboardHistory: [] });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'NEW_COPY') {
    chrome.storage.local.get(['clipboardhistory'], (data) => {
      let history = data.clipboardhistory || [];
      
      history.push(message.text);
      
      if (history.length > 5) {
        history.shift(); 
      }
      
      chrome.storage.local.set({ clipboardHistory: history });
    });
  }
});