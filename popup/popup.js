//something info which should be read in the popup-fields maybe?
var currentid = "fjlfj"



//The button configurations and functions start here
//actual sending here
function sendMessage(message) {
  chrome.tabs.query({active: true,currentWindow:true},function(tabs){
    chrome.tabs.sendMessage(tabs[0].id,message);
    console.log("sent: "+ message)
  })
}

//message selection according to the button
function callPlay() {
  let message = "play"
  sendMessage(message)
}

function callPause() {
  let message = "pause"
  sendMessage(message)
}

//button listeners, seems to need the 'click' name.
document.getElementById('play').addEventListener('click', callPlay);
document.getElementById('pause').addEventListener('click', callPause);