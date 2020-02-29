//choosing the right tab should be done somewhere?
//now sending always to the active tab
let myTab
let exists = false

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
    //this is the "lock this tab" -message
    //this is used!
    
    if (message.newTab) {
      //log sender 
      console.log(sender.id)
      myTab = message.newId
      console.log(myTab)
    }

    //the message is coming from popup (via content) 
    if(message.force) {
      //TODO: send to python?
    }

    //change url
    //TODO: is this needed in the final product
    if (message.newUrl) {
      console.log("new url: ", message.urlStr)
      //use the saved tab, use url from popup
      chrome.tabs.update(myTab, {url: message.urlStr})
    }
  }
}

//function to ask the status from listener
function rollStatus(port) {
  //dont ask if no tab is locked
  //TODO: how to disconnect?
  if (checkTab(myTab)) {
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

//checker function that the myTab tabExists
//maybe not the cleanest, but works...
function checkTab(myTab) {
  
  //if myTab is undefined, no need to query
  if (!myTab) {
    console.log("Tab not locked")
    return false
  }

  //else, query the tabs...
  else {
    chrome.tabs.query({url: "*://*/*"}, function (tabs) {
      tabExists = false  
      //search the tabs, if found -> true
      tabs.forEach(function(tab) {  
        if (tab.id == myTab) {
          //stop looking, we found a match
          tabExists = true
        }
      })
    })
  }

  if (tabExists) {
  console.log("Tab: ", myTab, "exists!")
  return true
  }
  else {
  //if not found from tabs, something is wrong
  console.log("Tab not found")
  return false
  }
  
}



//listener function for python messages
function clientMsg(cMsg) {
  //just logging atm
  //TODO: whatever needs to be done
  console.log(cMsg);
  return true;
}

//parse the msg received from the server
function serverMsg(sMsg) {

  console.log(sMsg);

  let fields = sMsg.split(";")
  let command = fields[0]
  let value = fields[1]

  if (command == 0) {
    //ask the tab to pause
    let message = {pauseCall:true}
    if (checkTab(myTab)) {
      chrome.tabs.sendMessage(myTab, message)
    }
  }
  if (command == 1) {
    //ask the tab to play
    let message = {playCall:true}
    if (checkTab(myTab)) {
      chrome.tabs.sendMessage(myTab, message)
    }
  }
  if (command == 2) {
    //ask the tab to skip
    let message = {skipCall:true, skipTime: value}
    if (checkTab(myTab)) {
      chrome.tabs.sendMessage(myTab, message)
    }
  }
  if (command == 3) {
    //ask the tab to change url
    //check that it exists...

    if (checkTab(myTab)) {
      chrome.tabs.update(myTab, {url: value})
    }
  }
  return true;
}

//Start the listeners, and the asking function

//so we are running rollstatus every 1000ms with clientPort argument
setInterval(rollStatus, 1000, clientPort);

//make a listener here for the popups lock-this-tab function
chrome.runtime.onMessage.addListener(contentMsg);

//start python listeners
clientPort.onMessage.addListener(clientMsg);
serverPort.onMessage.addListener(serverMsg);