//something info which should be read in the popup-fields maybe?
//var currentid = "fjlfj"

//The button configurations and functions start here
//actual sending to the content script listeners here:
function sendMessage(message) {
  chrome.tabs.query({active: true,currentWindow:true},function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
      console.log(response) //this is the response, what is current state
      //but where the hell do these logs go?
    });
    console.log("sent: "+ message)
  })
}

//message selection according to the button:
function callPlay() {
  let message = {playCall:true}
  sendMessage(message)
}

function callPause() {
  let message = {pauseCall:true}
  sendMessage(message)
}

function callStatus() {
  let message = {statusCall:true}
  sendMessage(message)
}

function callSkip(time) {
  //override value atleast for now
  time = 5.430
  let message = {skipCall:true, skipTime:time}
  sendMessage(message)
}

//button listeners, seems to need the 'click' name.
document.getElementById('play').addEventListener('click', callPlay);
document.getElementById('pause').addEventListener('click', callPause);
document.getElementById('status').addEventListener('click', callStatus);
document.getElementById('skip').addEventListener('click', callSkip);