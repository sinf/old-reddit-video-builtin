// ==UserScript==
// @name            Unfuck old.reddit.com video player
// @author          ArhoM
// @description     Replaces old.reddit.com video player with built-in player of web browser
// @version         1.0.1
// @namespace       https://github.com/sinf/old-reddit-video-builtin/
// @downloadURL     https://github.com/sinf/old-reddit-video-builtin/raw/main/script.js
// @license         MIT
// @include         https://old.reddit.com/r/*
// @require         https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// @require         https://github.com/sinf/old-reddit-video-builtin/raw/main/waitForKeyElements.js
// @grant           GM_addStyle
// @run-at          document-start
// ==/UserScript==

function fixup128794(x) {
  // for some reason removing events/callbacks from x isnt working
  // so why not delete the entire js-infested subtree of useless divs
  
  // need a wrapper div because styles
  let newx = jQuery('<div>', {
      id: x[0].id,
      class: x.attr('class'),
  });
  
  let vid = x.find('video');
  vid.off();
  vid.attr({'controls':true, 'id':'unfucked_video'});
  vid.appendTo(newx);
  
  let par = x.parent();
  par.children().remove();
  par.append(newx);
  x.remove();
}

function fixup128793(x) {
  console.log('found element');
  console.log(x);
  fixup128794(x);
}

// must not match the new wrapper element
let my_root_q = ".media-preview-content.video-player div.reddit-video-player-root[data-mpd-url]";

waitForKeyElements(my_root_q, fixup128793);

// some script generates a duplicate video element but with a low res preview video
waitForKeyElements("#unfucked_video + video", (x) => x.remove());

