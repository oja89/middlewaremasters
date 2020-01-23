//making this work with chrome first
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript({
      //file: '\scripts\toggle.js' //cant get this to work
      code: 'var video = document.getElementsByTagName("video")[0]; if (video.paused == true) {video.play(); } else {video.pause()}'
    });
  });
