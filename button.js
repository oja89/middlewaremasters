//add button
function iconButton() {
    //cant see where this goes...
    //if launched on bg, doesn't seem to write anywhere
    //console.log("Button pressed");
    
    //try to control the video
    //these dont work here
    //but if you press F12 in firefox those strings work...
    //something is missing
    $('video').play();
    $('video').pause();
    $('video').getDuration();
    $('video').getCurrentTime();
    //$("#player-api .html5-video-controls .ytp-button-pause").trigger("click");
    
    //var video = document.getElementsByTagName("video")[0];
    //looks like it should find right one...
        
        //video.video-stream.html5-main-video.play(); //not working?
        
/*
    if (video) {
      	if (video.paused) {
                video.play();
      	} 
        else {
                video.pause();
        } 
    }
    */
    //this part works
    /*
    browser.tabs.create({
        url: "https://developer.mozilla.org"
    });
    */
}

console.log("Button.js");
browser.browserAction.onClicked.addListener(iconButton);
//browser.browserAction.onClicked(iconButton); //this aint working
