//script for listening py-servers messages
let pyserver = "sd.server";
let port = chrome.runtime.connectNative(pyserver);


//msg received from the server
function msgGot(pyMessage) {
  //just logging atm
  console.log(pyMessage);
  return true;
}

port.onMessage.addListener(msgGot);
  
