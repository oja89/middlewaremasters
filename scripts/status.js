//listener for the messages
chrome.runtime.onMessage.addListener(statusCall);

//this function should give the statuses in a json object format
function statusCall(message, sender, sendresponse) {
    //console.log(sender.id) 
    //console.log("msg is: " + message)
    if (message.statusCall) {
        //get the video. from the elements
        let video = document.getElementsByTagName("video")[0];
                //run the status function
                //show the object in log
                currentStatus = getStatus(video)
                console.log(currentStatus)
                //send back
                sendresponse(currentStatus)
    }
}


//this function fetches the statuses from the video
function getStatus(video) {
    //create the object
    var status = {}
    
    //use the same "commands" as the video commands for clarity plz
    status.src = video.src //this is not same if different url
    status.paused = video.paused
    status.currentTime = video.currentTime
    status.playbackRate = video.playbackRate
    status.readyState = video.readyState
    status.baseURI = video.baseURI

    return status
}
