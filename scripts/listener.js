chrome.runtime.onMessage.addListener(command);

  //this listens to the messages, and calls functions
function command(message, sender, sendResponse) {
    
    //well this seems to change.. 
    //console.log(sender.id) 

    //just to make sure that other messages dont interrupt
    //implement this only after we can lock the id...
    //if (sender == "jeojdnmepccapignpagonaifommhfbkk") {

    let video = document.getElementsByTagName("video")[0];
        if (message.playCall) {
            play(video)
            //check video status and return it
            sendResponse(video.paused) 
        }
        if (message.pauseCall) {
            pause(video)
            //check video status and return it
            sendResponse(video.paused) 
        }

        if (message.skipCall) {
            skip(video, message.skipTime)
            //check video status and return it
            sendResponse(video.currentTime) 
        }

        //unneeded functions
        /*
        //this is not important. implement speed control if there is time
        if (message.command == "speed") {
            speed(video, message.value)
            sendResponse(video.playbackRate)
        }
        //toggle isnt needed
        if (message.command == "toggle") {
            toggle(video)
            //check video status and return it
            sendResponse(video.paused) 
        }
        */
   // }
}

//actual functions that the messages are calling for

//this toggling is not really useful in the actual extension
//works for testing though
function toggle(video, value) {
    if (video.paused == true) {
        video.play();
        console.log("!play")
    }
    else {
        video.pause()
        console.log("!pause")
    }
}

function play(video, value) {
    video.play();
    console.log("!play")
}

function pause(video, value) {
    video.pause();
    console.log("!pause")
}

//skip to a time
function skip(video, value) {
    video.currentTime = value; //skip somewhere
    console.log("!skip to: " + value)
}

//change playbackspeed to something
//also not important to implement at this point
function speed(video, value) {
    video.playbackRate = value
    console.log("!speed to: " + value)
}