//just to make sure that the sender is actually this extension
// this is derived from the key in manifest while the extension is not "published"

//change override to true in case the id is not stable
let senderOverride = false
let extensionID = "hkkmkkadhkpbgnecfmebieppmeenefgg"

//the video on _this_ page is:
let video = document.getElementsByTagName("video")[0];

//this listens to the messages, and returns new statuses (which do nothing)
chrome.runtime.onMessage.addListener(command);
//listener for the messages
chrome.runtime.onMessage.addListener(statusCall);

function command(message, sender, sendResponse) {
    if ((sender.id == extensionID) || senderOverride) {
        //get the tab, and save it?
        if (message.tab) {
            console.log("locked to: "+ message.id)
             //this should be forwarded to background, and only then it should start status asking  
            let bgMessage = {newTab:true, newId:message.id}
            chrome.runtime.sendMessage(bgMessage); 
            //this part seems to work for status asking at least
            //so that background gets status even while not focused
        }

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
            console.log("!skip to: " + message.skipTime,"new time is: "+ video.currentTime)
            //check video status and return it
            sendResponse(video.currentTime) 
        }
    }
}


//this function should give the statuses in a json object format
function statusCall(message, sender, sendresponse) {

    if ((sender.id == extensionID) || senderOverride) {
        if (message.statusCall) {             
            //run the status function
                //show the object in log
                currentStatus = getStatus(video)
                console.log(currentStatus)
                //send back
                sendresponse(currentStatus)
        }
    }
}


//this function fetches the statuses from the video
function getStatus(video) {
    //create the object
    var status = {}
    
    //use the same "commands" as the video commands for clarity plz
    status.src = video.src //this is not same if different url
    if (video.paused == false) {
        status.paused = 0;
    }
    else if (video.paused == true) {
        status.paused = 1;
    }
    status.currentTime = video.currentTime
    status.playbackRate = video.playbackRate
    status.readyState = video.readyState
    status.baseURI = video.baseURI

    return status
}

