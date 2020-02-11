chrome.runtime.onMessage.addListener(call);
  //name doesn't matter?
  //commands to manipulate here...
function call(message, sender, sendresponse) {
    console.log(sender.id) //well this seems to change...
    //just to make sure that other messages dont interrupt
    //well this seems to change..
    //if (sender == "jeojdnmepccapignpagonaifommhfbkk") {
    console.log("msg is: " + message)
        var video = document.getElementsByTagName("video")[0];
        if (message == "toggle") {
            if (video.paused == true) {
                video.play();
                console.log("!play")
            }
            else {
                video.pause()
                console.log("!pause")
            }
        }
        if (message == "skip") {
            let time = 10 //time in seconds? this should be in message too
            video.currentTime = time; //skip somewhere
            console.log("!skip to: " + time)
        }
        //this is not important. implement speed control if there is time
        if (message == "speed") {
            let speed = 2 //playbackspeed normal 1x
            video.playbackRate = speed
            console.log("!speed to: " + speed)
        }
   // }
}
