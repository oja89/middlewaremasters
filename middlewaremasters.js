//testing
console.log("middlewaremasters.js is started"); //this seems to work
//application.console.log("applic"); //didnt work
//firebug.console.log("firebug"); //didnt work

//document.body.style.border = "5px solid red";


//$('video').play()
//$('video').pause()
//$('video').currentTime = 100

while (1) {
    if ($('video').getCurrentTime() > 100) {
        $('video').playbackRate = 20;
    }
}
    
    

