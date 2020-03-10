//just to make sure that the sender is actually this extension
// this is derived from the key in manifest while the extension is not "published"
//change override to true in case the id is not stable
let senderOverride = false
let extensionID = "hkkmkkadhkpbgnecfmebieppmeenefgg"

//the video on _this_ page is:
let video = document.getElementsByTagName("video")[0];

//handling with the messages received from the background or popup
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
            currentStatus = getStatus(video)
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
        }

        //COMMANDS FROM BACKGROUND, modify player state:
        //background gets the python commands and forwards them

        if (message.playCall) {
            video.play();
            console.log("!play,"+ "paused: ", video.paused)            
            //check video status and return it
            sendResponse(video.paused) 
        }

        if (message.pauseCall) {
            video.pause();
            console.log("!pause,", "paused: ", video.paused)
        }

        if (message.skipCall) {
            video.currentTime = message.skipTime; //skip somewhere
            console.log("!skip to: " + message.skipTime,"new time is: "+ video.currentTime)
        }

        if (message.newUrl) {
            console.log("change url to: ", message.urlStr)
            chrome.runtime.sendMessage(message); 
        }

    }
    return true;
}

//this function fetches the statuses from the video
function getStatus(video) {
    //create the object
    let status = {}

    //use the same "commands" as the video commands for clarity plz
    if (video.paused == false) {
        status.paused = 0;
    }
    else if (video.paused == true) {
        status.paused = 1;
    }
    status.currentTime = video.currentTime
    status.baseURI = video.baseURI

    return status
}

//start the message listener (for bg and popup messages)
chrome.runtime.onMessage.addListener(listener);
