chrome.runtime.onMessage.addListener(call);
//this function should give the statuses in a json object format
function call(message, sender, sendresponse) {
    console.log(sender.id) 
    console.log("msg is: " + message)
    if (message == "status") {
                //run the status function
                //show the object in log
                console.log(getStatus())
    }
}

function getStatus() {
    //get the video. from the elements
    var video = document.getElementsByTagName("video")[0];
    //set empty status object, set also some defaults just in case
    //use the same "commands" as video. for clarity
    var status = {}
    status.src = video.src
    console.log("?url: " + status.src)
    status.paused = video.paused
    console.log("?paused: " + status.paused)
    status.currentTime = video.currentTime
    console.log("?time: " + status.currentTime)
    status.playbackRate = video.playbackRate
    console.log("?speed: " + status.playbackRate)
    //return the object
    return status
}
