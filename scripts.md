What scripts are included in the extension:

# Background scripts:

## background.js:

Runs always when the extension is on.
Currently askes for the status with "messages" once per sec.

# Script ran by html:

## popup.js:

Communicates with the popup.html
Send "messages" to content scripts

# Content scripts:

These are ran when the url matches the given criteria
(should be at least youtube)

## listener.js:

Listens for the commands from popup.js
Gives the command to the video element

## status.js

Listens for the command "status"
Currently answers for the status button by popup.js and the cyclical status asking from background.js


