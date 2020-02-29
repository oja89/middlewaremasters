//tab to receive the messages
let myTab

//find the bg-log
function bgLog(message) {
   chrome.extension.getBackgroundPage().console.log(message)
}

//actual sending function to the content script listeners here:
function sendMessage(message) {
  chrome.tabs.sendMessage(myTab, message)
}
//locking the tab-variable
//VERY IMPORTANT PART
//send it to listener, which can send it to background
function lockTab() {
  bgLog("tabButton")
  chrome.tabs.query({active: true,currentWindow:true},function(tabs){
    //save the tab locally
    myTab = tabs[0].id
    let message = {tab:true, id:myTab}
    sendMessage(message)
    bgLog("Tab id: " + myTab) //the locked tab id
    });
}

//The button configurations and functions start here
//These are the new ones from popup which need to be send forward to background

//is there a need for these?

function callPlay() {
  bgLog("playButton")
  let message = {force:true, playForce:true}
  sendMessage(message)
}

function callPause() {
  bgLog("pauseButton")
  let message = {force:true, pauseForce:true}
  sendMessage(message)
}


//this is at the moment a somewhat temporary "this works"-example
function callUrl() {
  let url = "https://www.youtube.com/watch?v=Ca_oJg5aThY"
  //TODO:
  //url should be changed to be the one that is active on this tab?
  //or which is input somewhere?
  //and just force it to other clients?
  let message = {newUrl:true, urlStr:url}
  sendMessage(message)
  bgLog("changeUrl")
}


//button listeners, seems to need the 'click' name.
document.getElementById('play').addEventListener('click', callPlay);
document.getElementById('pause').addEventListener('click', callPause);
document.getElementById('url').addEventListener('click', callUrl);
document.getElementById('lock').addEventListener('click', lockTab);

