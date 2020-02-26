//Status-asking with a timer here

//choosing the right tab should be done somewhere?
//now sending always to the active tab
let myTab

//now getting this info popup -> listener -> background and seems to work for status
function lockTheTab(bgMessage, sender, sendResponse) {
  if (bgMessage.newTab) {
    //log sender 
    console.log(sender.id)
    myTab = bgMessage.newId
    console.log(myTab)
  }
}

function rollStatus() {
  //dont ask if no tab is locked
  //how to disconnect?
  if (myTab) {
    let message = {statusCall:true}
    //send it without quering
    //console.log("mytab:"+ myTab)
    chrome.tabs.sendMessage(myTab, message, function(response) {
    console.log(response) //this is the status-object
      });
    }
}

//intervaltime in ms
const createClock = setInterval(rollStatus, 1000)

//moved to the end
//make a listener here for the popups lock-this-tab function
chrome.runtime.onMessage.addListener(lockTheTab)
