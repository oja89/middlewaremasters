function status() {
    
      //console.log("hello")
      let message = "status"
      chrome.tabs.query({active: true,currentWindow:true},function(tabs){
        chrome.tabs.sendMessage(tabs[0].id,message);
        console.log("sent: "+ message)
      })
}
  
  document.getElementById('play').addEventListener('click', status);