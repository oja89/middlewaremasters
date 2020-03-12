# Installation and running the extension

This is a Youtube video syncer that works in a LAN environment done in Distributed Systems course. It is meant to work with 3 users per session. Only works on Windows.

## Installation guide

Clone this repo, open chrome://extensions/ in Chrome.
Enable developer mode (kehittäjätila) from the right corner. 
Click "Load unpacked" ("Lataus purettu").
Choose the repo folder.

To install the native host needed for the extension, go in command prompt 
to the /nativehost/ folder and run nativeinstall.bat.

## Running the extension

When the extension is enabled, you should see the icon button appear in the top right corner. Clicking on the icon will
open a popup menu. 

Open youtube, open a video, and press "use this tab" from the popup menu. After that, refresh the page so that
the content script loads correctly. Sometimes you might have to refresh the page a couple of times. 
If there are any sessions available in the local network, the popup menu will show them on the top.
You can join a session by clicking "join". Or you can create a new session by clicking "Create new session". By doing any of these options, the extension will start sending messages in LAN with that session id and listening to messages with that session id. 

By clicking "force play" you will force everyone in the session to unpause their videos, even if everyone else is paused. By clicking "force pause" 
everyone's video will pause. 

## In addition

On the extensions page you can select to open the background page of the extension.
Use that to see the console.log from background.js script. That log shows the messages and commands received in the current session. This is 
a very useful debugging tool. If the tab is not chosen, it will print "Tab not locked".

Sd-server creates log files in the nativehost directory. 

On youtube-tab, you can press "F12" to open the console.
It shows the console from the content scripts (listener.js)

In popup/popup.md is a short introduction about popup side

In scripts/scripts.md is a short info how scripts work

## How to uninstall extension

Remove the extension on chrome://extensions/ in Chrome. 

To uninstall nativehost, run the uninstall script ("uninstall.bat").

# Keep in mind

The extension was developed so that each session has to have at least 3 users in a session. The extension has only been tested with 3 users at the same time in a session. It will definitely not work correctly with less than 3 users. 

Sd-server will not close after exitting Chrome. Close sd-server by closing any Python processes after exiting Chrome. It will not take up much resources at all, though.

There is currently no good way to quit a session or to switch a video for the session. Currently the best way is to refresh the extension in chrome://extensions to reload it or just creating a new session.
