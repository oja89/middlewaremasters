//choosing the right tab should be done somewhere?
//now sending always to the active tab
let myTab

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
function rollStatus() {
  //dont ask if no tab is locked
  //TODO: how to disconnect?
  if (myTab) {
    let message = {statusCall:true}
    //send it without quering
    chrome.tabs.sendMessage(myTab, message, function(response) {
      console.log(response) //response is the status-object
    });
  } 
}

//intervaltime in ms
const createClock = setInterval(rollStatus, 1000);

//moved to the end
//make a listener here for the popups lock-this-tab function
chrome.runtime.onMessage.addListener(contentMsg);