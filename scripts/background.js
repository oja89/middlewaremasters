//choosing the right tab should be done somewhere?
//now sending always to the active tab
let myTab

//ports for python
let pyClient = "sd.client";
let clientPort = chrome.runtime.connectNative(pyClient);
let pyServer = "sd.server";
let serverPort = chrome.runtime.connectNative(pyServer);


//change override to true in case the id is not stable
let senderOverride = false
let extensionID = "hkkmkkadhkpbgnecfmebieppmeenefgg"
//would be smarter to import these from listener or vice versa...?

//building communication popup -> content -> background
//function to deal with content messages:
function contentMsg(message, sender, sendResponse) {
  if ((sender.id == extensionID) || senderOverride) {
    
    //the sender uses forced == true when pressed from popup
    //TODO: remove this if not used by the program
    if(message.force) {
      //the message is coming from popup (via content)
      //this should be just sent away
      
      //TODO: put the fancy python socket here!!!

      //but i want to know that this exist, so
      console.log("MSG from POPUP!:")
      console.log(message)
    }

    //change url
    //this is also a override-function
    //TODO: remove this
    if (message.newUrl) {
      console.log(message.urlStr)
      console.log(message.thisTab)
      //use the saved tab, use url from popup
      chrome.tabs.update(myTab, {url: message.urlStr})
    }

    //this is the "lock this tab" -message
    //this is used!
    if (message.newTab) {
      //log sender 
      console.log(sender.id)
      myTab = message.newId
      console.log(myTab)
    }
  }
}

//function to ask the status from listener
function rollStatus(port) {
  //dont ask if no tab is locked
  //TODO: how to disconnect?
  if (myTab) {
    let message = {statusCall:true}
    
    //console.log("mytab:"+ myTab)

    //send message to the tab with the video
    chrome.tabs.sendMessage(myTab, message, function(response) {
    //the content-script responds with the status message
      console.log(response); //this is the status-object
      //send to python client
      if (response !== undefined) {
        port.postMessage("testsession1;" + JSON.stringify(response)); 
      }
    });
  }
}

//listener function for python messages
function clientMsg(cMsg) {
  //just logging atm
  console.log(cMsg);
  return true;
}

//msg received from the server
function serverMsg(sMsg) {

  console.log(sMsg);

  let fields = sMsg.split(";")
  let command = fields[0]
  let value = fields[1]

  if (command == 0) {
    //ask the tab to pause
    let message = {pauseCall:true}
    chrome.tabs.sendMessage(myTab, message)
  }
  if (command == 1) {
    //ask the tab to play
    let message = {playCall:true}
    chrome.tabs.sendMessage(myTab, message)
  }
  if (command == 2) {
    //ask the tab to skip
    let message = {skipCall:true, skipTime: value}
    chrome.tabs.sendMessage(myTab, message)
  }
  if (sMsg == 3) {
    //ask the tab to change url
    //let message = {newUrl:true, urlStr: value}
    //chrome.tabs.sendMessage(myTab, message)
    
    //actually we can do it just here
    chrome.tabs.update(myTab, {url: value})
  }
  return true;
}

//listeners and functions to actually run
//moved to the end

//so we are running rollstatus every 1000ms with clientPort argument
const createClock = setInterval(rollStatus, 1000, clientPort);

//make a listener here for the popups lock-this-tab function
chrome.runtime.onMessage.addListener(contentMsg);

//start python listeners
clientPort.onMessage.addListener(clientMsg);
serverPort.onMessage.addListener(serverMsg);