//something info which should be read in the popup-fields maybe?
//var currentid = "fjlfj"

//we are always sending to the current tab, that should be changed somehow
let myTab

//The button configurations and functions start here
//actual sending to the content script listeners here:
function sendMessage(message) {
     chrome.tabs.sendMessage(myTab, message, function(response) {
      //chrome.extension.getBackgroundPage().console.log(response) //this is the response, what is current state
      //but where the hell do these logs go?
    });
    chrome.extension.getBackgroundPage().console.log("sent message to tab: " + myTab)
    //chrome.extension.getBackgroundPage().console.log(message)
}

//message selection according to the button:

//these should be modified to just send these to the python,
//not to the own video-player
//ill leave these here for now so they are easier to copy to the python sender?

/* 
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

//this has not been implemented anywhere yet
function callUrl(url) {
  //override value atleast for now
  url = "https://www.youtube.com/watch?v=cVzl3_YA-e8"
  let message = {urlCall:true, urlString:url}
  sendMessage(message)
}
*/



//These are the new ones from popup which need to be send forward to background

function callPlay() {
  chrome.extension.getBackgroundPage().console.log("playButton")
  let message = {force:true, playForce:true}
  sendMessage(message)
}

function callPause() {
  chrome.extension.getBackgroundPage().console.log("pauseButton")
  let message = {force:true, pauseForce:true}
  sendMessage(message)
}

//locking the tab-variable
//send it to listener, which can send it to background
function lockTab() {
  chrome.extension.getBackgroundPage().console.log("tabButton")
  chrome.tabs.query({active: true,currentWindow:true},function(tabs){
    myTab = tabs[0].id
    let message = {tab:true, id:myTab}
    sendMessage(message)
    chrome.extension.getBackgroundPage().console.log("Tab id: " + myTab) //the locked tab id
    });
}

function callUrl() {
  let url = "https://www.youtube.com/watch?v=Ca_oJg5aThY"
  let message = {newUrl:true, urlStr:url}
  sendMessage(message)
  chrome.extension.getBackgroundPage().console.log("changeUrl")
}


//button listeners, seems to need the 'click' name.
document.getElementById('play').addEventListener('click', callPlay);
document.getElementById('pause').addEventListener('click', callPause);
//document.getElementById('status').addEventListener('click', callStatus);
document.getElementById('url').addEventListener('click', callUrl);
//document.getElementById('skip').addEventListener('click', callSkip);
document.getElementById('lock').addEventListener('click', lockTab);

