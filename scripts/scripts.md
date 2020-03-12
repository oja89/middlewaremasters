What scripts are included in the extension:

# Background scripts:

## background.js:

Runs always when the extension is on.
Currently askes for the status with "messages" once per sec.

# Script ran by html:

## popup.js:

Communicates with the popup.html
Send "messages" to background script
It is conveniently located in the popup-folder

# Content scripts:

These are ran when the url matches the given criteria
(should be at least youtube)

## listener.js:

Currently answers to the cyclical video status asking from background.js



