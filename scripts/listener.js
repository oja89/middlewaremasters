//just to make sure that the sender is actually this extension
// this is derived from the key in manifest while the extension is not "published"

//change override to true in case the id is not stable
let senderOverride = true //false
let extensionID = "hkkmkkadhkpbgnecfmebieppmeenefgg"

//the video on _this_ page is:
//should this be updated by some functions?
let video = document.getElementsByTagName("video")[0];

function listener(message, sender, sendResponse) {
    if ((sender.id == extensionID) || senderOverride) {
        //if it is a force-message, just send it forward
        //(popup to background)
        if (message.force) {
            chrome.runtime.sendMessage(message); 
        }

        //status roller
        if (message.statusCall) {             
            //run the status function
                //show the object in log
                currentStatus = getStatus(video)
                console.log(currentStatus)
                //send back
                sendResponse(currentStatus)
        }
        
        //tab-selector
        //get the tab, to lock the tab
        if (message.tab) {
            console.log("locked to: "+ message.id)
             //this should be forwarded to background, and only then it should start status asking  
            let bgMessage = {newTab:true, newId:message.id}
            chrome.runtime.sendMessage(bgMessage); 
            //this part seems to work for status asking at least
            //so that background gets status even while not focused
        }

        //command calls
        //these should now come from the python script

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


//test rolling a logical number clock
let timestamp = 0
//this function fetches the statuses from the video
function getStatus(video) {
    //create the object
    let status = {}
    timestamp += 1
    status.timestamp = timestamp 

    //use the same "commands" as the video commands for clarity plz
    status.src = video.src //this is not same if different url
    status.paused = video.paused
    status.currentTime = video.currentTime
    status.playbackRate = video.playbackRate
    status.readyState = video.readyState
    status.baseURI = video.baseURI

    return status
}

//this listens to the messages
chrome.runtime.onMessage.addListener(listener);
