chrome.runtime.onMessage.addListener(call);
  //name doesn't matter?
  //commands to manipulate here...
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
        let time = 10 //time in seconds? this should be in message too
        video.currentTime = time; //skip somewhere
    }
    if (message == "speed") {
        let speed = 2 //playbackspeed normal 1x
        video.playbackRate = speed
    }
}

