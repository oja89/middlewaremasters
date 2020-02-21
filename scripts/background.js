//Status-asking with a timer here

function rollStatus() {
  let message = {statusCall:true}
  //send it
  chrome.tabs.query({active: true,currentWindow:true},function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
      console.log(response) //this is the status-object
    });
  })
}

//intervaltime in ms
const createClock = setInterval(rollStatus, 1000);
