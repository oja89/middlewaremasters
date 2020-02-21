//Status-asking with a timer here

function rollStatus() {
  let message = {statusCall:true}
  //send it
  chrome.tabs.query({active: true,currentWindow:true},function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
      console.log(response) //this is the status-object
      status = response; //this was just something to get this forward
    });
    console.log("sent: "+ message)
  })
}

//intervaltime in ms
const createClock = setInterval(rollStatus, 6000);

//all previous stuff with the button testing is now irrelevant, the popup overrides the button function
