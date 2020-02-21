//Status-asking with a timer here

//choosing the right tab should be done somewhere?
//now sending always to the active tab
let myTab

//make a listener here for the popups lock-this-tab function
chrome.runtime.onMessage.addListener(lockTheTab)

//no success with this
function lockTheTab(bgMessage, sender, sendResponse) {
  if (bgMessage.newTab) {
    //log sender 
    console.log(sender.id)
    myTab = bgMessage.newId
    console.log(myTab)
  }
}

function rollStatus() {
  let message = {statusCall:true}
  //send it without quering
  console.log("mytab:"+ myTab)
    chrome.tabs.sendMessage(myTab, message, function(response) {
      
      console.log(response) //this is the status-object
    });
}

//intervaltime in ms
const createClock = setInterval(rollStatus, 1000)
