//something info which should be read in the popup-fields maybe?
//var currentid = "fjlfj"

//we are always sending to the current tab, that should be changed somehow
let myTab


//The button configurations and functions start here
//actual sending to the content script listeners here:
function sendMessage(message) {
     chrome.tabs.sendMessage(myTab, message, function(response) {
      console.log(response) //this is the response, what is current state
      //but where the hell do these logs go?
    });
    console.log("sent: "+ message, "tab: " + myTab)
  //})
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

//locking the tab-variable
//send it to listener, which can send it to background
function lockTab() {
  chrome.tabs.query({active: true,currentWindow:true},function(tabs){
    myTab = tabs[0].id
    let message = {tab:true, id:myTab}
    sendMessage(message)
    console.log(myTab) //this is the status-object
    });
}



//button listeners, seems to need the 'click' name.
document.getElementById('play').addEventListener('click', callPlay);
document.getElementById('pause').addEventListener('click', callPause);
document.getElementById('status').addEventListener('click', callStatus);
document.getElementById('skip').addEventListener('click', callSkip);
document.getElementById('lock').addEventListener('click', lockTab);