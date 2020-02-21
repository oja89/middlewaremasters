chrome.runtime.onMessage.addListener(command);

  //this listens to the messages, and calls functions
function command(message, sender, sendResponse) {

    let video = document.getElementsByTagName("video")[0];
        if (message.playCall) {
            video.play();
            console.log("!play,"+ "paused: ", video.paused)            
            //check video status and return it
            sendResponse(video.paused) 
        }
        if (message.pauseCall) {
            video.pause();
            console.log("!pause,", "paused: ", video.paused)
            //check video status and return it
            sendResponse(video.paused) 
        }

        if (message.skipCall) {
            video.currentTime = message.skipTime; //skip somewhere
            console.log("!skip to: " + message.skipTime)
            console.log("new time is: "+ video.currentTime)
            //check video status and return it
            sendResponse(video.currentTime) 
        }
}

