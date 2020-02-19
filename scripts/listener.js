chrome.runtime.onMessage.addListener(command);

  //this listens to the messages, and calls functions
function command(message, sender, sendresponse) {
    
    //well this seems to change.. 
    console.log(sender.id) 

    //just to make sure that other messages dont interrupt
    //implement this only after we can lock the id...
    //if (sender == "jeojdnmepccapignpagonaifommhfbkk") {

    //so the message received from the background is:
    //console.log("msg is: " + message)
    
    //lets split the message already here
    //so that we can use the value where needed
    let fields = message.split("_")
    let command = fields[0]
    let value = fields[1]
    console.log(command)
    console.log(value)

    let video = document.getElementsByTagName("video")[0];
        //toggle isnt needed
        if (command == "toggle") {
            toggle(video)
        }
        if (command == "play") {
            play(video)
        }
        if (command == "pause") {
            pause(video)
        }

        if (command == ("skip")) {
            //let value = 10 //time in seconds? this should be in message too
            skip(video, value)
        }
        //this is not important. implement speed control if there is time
        if (command == "speed") {
        speed(video, value)
        }
        else {console.log("msg unknown: " + message)}
   // }
}

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
    console.log("!play")
}

//skip to a time
function skip(video, value) {
    video.currentTime = value; //skip somewhere
    console.log("!skip to: " + value)
}

//change playbackspeed to something
function speed(video, value) {
    video.playbackRate = value
    console.log("!speed to: " + value)
}