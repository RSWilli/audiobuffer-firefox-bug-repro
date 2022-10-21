# audiobuffer-firefox-bug-repro

the script does the following:

1. create a 5s `AudioBuffer` with a 300Hz sine tone via OfflineAudioContext
2. extract the channeldata for channel 0
3. prints to DOM a section of the channels Float32Array via `channel.slice(0,100)`
   1. this operation fails when the ArrayBuffer is detached, then it will print "detached"
4. waits for the user to click play (for autoplay reasons) the bug also happens when no audio is played
   then it does the following steps with delays in betweeen, so the moment the ArrayBuffer detaches becomes apparent:
   1. immediately: resume the AudioContext
   2. after 2s: set the AudioBufferSourceNode's buffer to the sine wave AudioBuffer
   3. after 5s: start the playback of the AudioBufferSourceNode

# Result

in Firefox 105.0.3 (64-bit) step 4.2. detaches the channeldata Float32Array