//Status-asking with a timer here

function rollStatus() {
  let message = "status"
  //send it
  chrome.tabs.query({active: true,currentWindow:true},function(tabs){
    chrome.tabs.sendMessage(tabs[0].id,message);
    console.log("sent: "+ message)
  })
}

//intervaltime in ms
const createClock = setInterval(rollStatus, 1000);

//all previous stuff with the button testing is now irrelevant, the popup overrides the button function

//sd-side stuff

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

