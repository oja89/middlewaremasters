var backpage = chrome.extension.getBackgroundPage();
backpage.console.log("Alotettu");

function msgGot(message) {
  backpage.console.log(message);
  return true;
}

function connectToServer() {
    var nativehost = "sd.server";
    port = chrome.runtime.connectNative(nativehost);
    port.onMessage.addListener(msgGot);
  }
  
  connectToServer()