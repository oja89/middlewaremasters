//Status-asking with a timer here

//choosing the right tab should be done somewhere?
//now sending always to the active tab
let myTab
var port

//make a listener here for the popups lock-this-tab function
chrome.runtime.onMessage.addListener(lockTheTab)

//now getting this info popup -> listener -> background and seems to work for status
function lockTheTab(bgMessage, sender, sendResponse) {
  if (bgMessage.newTab) {
    //log sender 
    console.log(sender.id)
    myTab = bgMessage.newId
    console.log(myTab)
  }
}

function rollStatus(port) {
  //dont ask if no tab is locked
  //how to disconnect?
  if (myTab) {
    let message = {statusCall:true}
    //send it without quering
    console.log("mytab:"+ myTab)
      chrome.tabs.sendMessage(myTab, message, function(response) {
        console.log(response); //this is the status-object
        if (response !== undefined) {
          port.postMessage("testsession1;" + JSON.stringify(response)); 
        }
          
      });
    }
}

//intervaltime in ms

//all previous stuff with the button testing is now irrelevant, the popup overrides the button function

//sd-side stuff

var backpage = chrome.extension.getBackgroundPage();


function msgGot(message) {
  backpage.console.log(message);
  return true;
}


var nativehost = "sd.client";
port = chrome.runtime.connectNative(nativehost);
port.onMessage.addListener(msgGot);





const createClock = setInterval(rollStatus, 1000, port);