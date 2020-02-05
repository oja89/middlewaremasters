//making this work with chrome first
chrome.browserAction.onClicked.addListener(function(tab) {
  let message = "toggle"; 
  
  //conffed messages: "toggle", "skip" "speed"
  //todo: add more buttons maybe...

  chrome.tabs.query({active: true,currentWindow:true},function(tabs){
    chrome.tabs.sendMessage(tabs[0].id,message);
  })
})

