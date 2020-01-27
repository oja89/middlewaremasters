//making this work with chrome first
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript({
      //file: '\scripts\toggle.js' //cant get this to work
      code: 'var video = document.getElementsByTagName("video")[0]; if (video.paused == true) {video.play(); } else {video.pause()}'
    });
  });

var backpage = chrome.extension.getBackgroundPage();
backpage.console.log("Alotettu");
function msgGot() {
  backpage.console.log("Pyyttonilta viesti");
}

function connectToClient() {
  var nativehost = "sd.client";
  port = chrome.runtime.connectNative(nativehost);
  port.onMessage.addListener(msgGot);
}

connectToClient()