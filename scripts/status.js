chrome.runtime.onMessage.addListener(call);
//this function should give the statuses in a json object format
function call(message, sender, sendresponse) {
    console.log(sender.id) 
    console.log("msg is: " + message)
    if (message == "status") {
        
            if (message == "status") {
                //run the status function
                getStatus()
            }
    }
}

function getStatus() {
    //get the video. from the elements
    var video = document.getElementsByTagName("video")[0];
    //set empty status object
    var status = {
        paused: "value1",
        currentTime: "value2",
        speed: "value3"
    }
    //set default
    status.paused = video.paused
    console.log("?paused: " + status.paused)
    status.currentTime = video.currentTime
    console.log("?time: " + status.currentTime)
    status.playbackRate = video.playbackRate
    console.log("?speed: " + status.playbackRate)
    console.log(status)
}
