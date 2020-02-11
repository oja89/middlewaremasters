//making this work with chrome first

//this triggers from the button...
chrome.browserAction.onClicked.addListener(function(tab) {
  let message = "status"; 
  chrome.tabs.query({active: true,currentWindow:true},function(tabs){
    chrome.tabs.sendMessage(tabs[0].id,message);
  })
})

  //conffed messages: "toggle", "skip" "speed" 
  //(and status)
  //todo: add more buttons maybe...
  //should be done with html and css ?


