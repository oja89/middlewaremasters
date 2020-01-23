var video = document.getElementsByTagName("video")[0];
if (video.paused == true) {
    video.play();
}
else {
    video.pause()
}