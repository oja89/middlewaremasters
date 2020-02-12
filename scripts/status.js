chrome.runtime.onMessage.addListener(call);
//this function should give the statuses in a json object format
function call(message, sender, sendresponse) {
    console.log(sender.id) 
    //console.log("msg is: " + message)
    if (message == "status") {
        //get the video. from the elements
        let video = document.getElementsByTagName("video")[0];
                //run the status function
                //show the object in log
                console.log(getStatus(video))
    }
    else {console.log("msg unknown: " + message)}
}

function getStatus(video) {
    //use the same "commands" as the video commands for clarity plz
    var status = {}
    status.src = video.src
    console.log("?url: " + status.src)
    status.paused = video.paused
    console.log("?paused: " + status.paused)
    status.currentTime = video.currentTime
    console.log("?time: " + status.currentTime)
    status.playbackRate = video.playbackRate
    console.log("?speed: " + status.playbackRate)

    //more experimental things
    status.readyState = video.readyState


    
    //return the object?
    return status
}
