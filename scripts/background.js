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
function contentMsg(message, sender, sendResponse) {
  if ((sender.id == extensionID) || senderOverride) {
    //the sender uses forced == true when pressed from popup
    if(message.force) {
      //the message is coming from popup
      //this should be just sent away
      
      //TODO: put the fancy python socket here!!!

      //but i want to know that this exist, so
      console.log("MSG from POPUP!:")
      console.log(message)
    }

    //this is the "lock this tab" -message
    if (message.newTab) {
      //log sender 
      console.log(sender.id)
      myTab = message.newId
      console.log(myTab)
    }

    //change url
    if (message.newUrl) {
      console.log(message.urlStr)
      console.log(message.thisTab)
      //use the saved tab, use url from popup
      chrome.tabs.update(myTab, {url: message.urlStr})
    }
  }
}

//function to ask the status from listener
function rollStatus(port) {
  //dont ask if no tab is locked
  //TODO: how to disconnect?
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

//so we are running rollstatus every 1000ms with clientPort argument
const createClock = setInterval(rollStatus, 1000, clientPort);

//listener function for python messages
function clientMsg(cMsg) {
  //just logging atm
  console.log(cMsg);
  return true;
}



//msg received from the server
function serverMsg(sMsg) {
  //just logging atm
  console.log(sMsg);

  //MESSAGES that are coming
  //0 -> pause
  //1 -> play
  //2;12331 -> skip to 12331
  //3;"url" -> use this url

  return true;
}

//moved to the end
//make a listener here for the popups lock-this-tab function
chrome.runtime.onMessage.addListener(contentMsg);

//start python listeners
clientPort.onMessage.addListener(clientMsg);
serverPort.onMessage.addListener(serverMsg);