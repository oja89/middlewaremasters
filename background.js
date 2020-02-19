//try to implement a timer for status calls here

function rollStatus() {
  let message = "status"
  //send it
  chrome.tabs.query({active: true,currentWindow:true},function(tabs){
    chrome.tabs.sendMessage(tabs[0].id,message);
    console.log("sent: "+ message)
  })
}

const createClock = setInterval(rollStatus, 1000);

//all this stuff is now irrelevant, the popup overrides the button function

/*
//making this work with chrome first

//some fancy testing
let message = "status"
let i = 0
//this triggers from the button...
chrome.browserAction.onClicked.addListener(function(tab) {

  //fancy testing here
  if (i==1) {
    message = "toggle"
  }
  if (i==2) {
    message = "toggle"
  }
  if (i==3) {
    message = "skip_4.2455"
  }
  if (i==4) {
    message = "speed_1.5"
  }
  if (i==5) {
    message = "speed_1"
  }
  if (i==6) {
    message = "status"
  }
  i++
  //reroll to 0
  if (i>6) {i=0}
  
  chrome.tabs.query({active: true,currentWindow:true},function(tabs){
    chrome.tabs.sendMessage(tabs[0].id,message);
    console.log("sent: "+ message)
  })
})

  //conffed messages: "toggle", "skip" "speed" 
  //(and status)
  //todo: add more buttons maybe...
  //should be done with html and css ?
*/

