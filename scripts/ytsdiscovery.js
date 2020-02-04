function connectToClient() {
    var nativehost = "sd.client";
    port = chrome.runtime.connectNative(nativehost);
  }
  
  connectToClient()