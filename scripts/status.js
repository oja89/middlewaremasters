//listener for the messages
chrome.runtime.onMessage.addListener(statusCall);

//this function should give the statuses in a json object format
function statusCall(message, sender, sendResponse) {
    console.log(sender.id) 
    //console.log("msg is: " + message)
    if (message == "status") {
        //get the video. from the elements
        let video = document.getElementsByTagName("video")[0];
                //run the status function
                //show the object in log
                currentStatus = getStatus(video)
                console.log(currentStatus)
                
                //this seems to work
                sendResponse(currentStatus)
    }
    //else there is nothing to do in this module
    else {console.log("msg unknown: " + message)}
}


//this function fetches the statuses from the video
function getStatus(video) {
    //use the same "commands" as the video commands for clarity plz

    //create the object
    var status = {}

    status.src = video.src //this is not same if different url
    console.log("?url: " + status.src)
    status.paused = video.paused
    console.log("?paused: " + status.paused)
    status.currentTime = video.currentTime
    console.log("?time: " + status.currentTime)
    status.playbackRate = video.playbackRate
    console.log("?speed: " + status.playbackRate)

    //more experimental things
    status.readyState = video.readyState
    status.baseURI = video.baseURI

    
    //return the object?
    return status
}
