chrome.runtime.onMessage.addListener(call);
  //name doesn't matter?
function call(message, sender, sendresponse) {
    var video = document.getElementsByTagName("video")[0];
    if (message == "toggle") {
        if (video.paused == true) {
            video.play();
        }
        else {
            video.pause()
        }
    }
    if (message == "skip") {
        let time = 10 //time in seconds?
        video.currentTime = time; //skip somewhere
    }
    
}

