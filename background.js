//making this work with chrome first
chrome.browserAction.onClicked.addListener(function(tab) {
  let message = "skip"; 
  
  //conffed messages: "toggle", "skip"
  //todo: add more buttons maybe...

  chrome.tabs.query({active: true,currentWindow:true},function(tabs){
    chrome.tabs.sendMessage(tabs[0].id,message);
  })
})

var backpage = chrome.extension.getBackgroundPage();
backpage.console.log("Alotettu");

function msgGot(message) {
  backpage.console.log("Pyyttonilta viesti");
  return true;
}

function connectToServer() {
  var nativehost = "sd.server";
  port = chrome.runtime.connectNative(nativehost);
  port.onMessage.addListener(msgGot);
}

connectToServer()
