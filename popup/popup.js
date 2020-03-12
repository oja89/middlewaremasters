//tab to receive the messages
let myTab

//find the bg-log
function bgLog(message) {
   chrome.extension.getBackgroundPage().console.log(message)
}

function getRndInteger(min, max) {
  // From w3schools https://www.w3schools.com/js/js_random.asp
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//actual sending function to the content script listeners here
//Not used anymore
function sendMessage(message) {
  chrome.tabs.sendMessage(myTab, message)
}
//locking the tab-variable
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


function callPlay() {
  bgLog("playButton")
  let message = 1;
  chrome.runtime.sendMessage(message);
}

function callPause() {
  bgLog("pauseButton")
  let message = 0;
  chrome.runtime.sendMessage(message);
}

function newSession() {
  let sessid = getRndInteger(0, 10000);
  let message = {joinsess:sessid};
  chrome.runtime.sendMessage(message);
}

/* Function used in testing, now unnecessary
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
}*/

/*
* Listen to the messages from background script that contain sessions list
*/
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  bgLog(message);
  if (message.sessions) {
    //Stuff for the session buttons creation
    var info = message['sessions'];
    bgLog(info);
    var table = document.getElementById("table");
    for(var i = table.rows.length - 1; i > 0; i--){
      table.deleteRow(i);
    }
    var storageLength = info.length;

    //Show the sessions to the user in the popup and create join buttons
    for (var i = 0; i < info.length; i++) {
      var row = table.insertRow(i + 1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);

      cell1.innerHTML = info[i];

      var joinButtonHTML = "<input type=button value=Join class=join id=join-button" + (i + 1) + ">";
      cell2.innerHTML = joinButtonHTML;
      cell2.addEventListener("click", function(event) {
        bgLog(cell1.innerHTML);
        sessid = cell1.innerHTML;
        let message = {joinsess:sessid};
        chrome.runtime.sendMessage(message);

      }); 
    }
  }
  return true;
});


//button listeners
document.getElementById('play').addEventListener('click', callPlay);
document.getElementById('pause').addEventListener('click', callPause);
document.getElementById('create').addEventListener('click', newSession);
document.getElementById('lock').addEventListener('click', lockTab);
