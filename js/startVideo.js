import  { applyEyebrows} from './makeupComponents/drawEyebrows'
//set up
var canvas, ctx, drawingPad, dctx, vid;
var pos, yOffset, xOffset, eyelinerPosL, eyelinerPosR,box;

var startVideo = function(){
    vid.play();
    ctrack.start(vid);
    // unlockMakeUp();
    trackingStarted = true;

    drawLoop();
}

document.addEventListener("DOMContentLoaded", function(event) {
    canvas = document.getElementById('overlay');
    ctx = canvas.getContext('2d');
    drawingPad = document.getElementById('drawingPad');
    dctx = drawingPad.getContext('2d');  
    vid = document.getElementById('video');
    vid.addEventListener('canplay', enablestart, false);

    document.getElementById('startbutton').onclick = startVideo;
});

//set up video
/**
 * Provides requestAnimationFrame in a cross browser way.
 */
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.oRequestAnimationFrame ||
           window.msRequestAnimationFrame ||
           function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
             return window.setTimeout(callback, 1000/60);
           };
  })();
  
  /**
   * Provides cancelRequestAnimationFrame in a cross browser way.
   */
  window.cancelRequestAnimFrame = (function() {
    return window.cancelAnimationFrame ||
           window.webkitCancelRequestAnimationFrame ||
           window.mozCancelRequestAnimationFrame ||
           window.oCancelRequestAnimationFrame ||
           window.msCancelRequestAnimationFrame ||
           window.clearTimeout;
  })();


navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;

if (navigator.getUserMedia) {
    navigator.getUserMedia({video : true}, onSuccess, onFail);
} else {
    onFail()
}

function onSuccess( stream ) {
    // add camera stream if getUserMedia succeeded
    if ("srcObject" in vid) {
        vid.srcObject = stream;
    } else {
        vid.src = (window.URL && window.URL.createObjectURL(stream));
    }
    vid.onloadedmetadata = function() {
        vid.play();
    }
    // vid.onresize = function() {
    //     adjustVideoProportions();
    //     if (trackingStarted) {
    //         ctrack.stop();
    //         ctrack.reset();
    //         ctrack.start(vid);
    //     }
    // }
}

function onFail() {
    alert("There was some problem trying to fetch video from your webcam, try using chrome or check that your camera is enabled.");
}

//face tracking

var ctrack = new clm.tracker();
ctrack.init();
var trackingStarted = false;

function enablestart() {
    var startbutton = document.getElementById('startbutton');
    startbutton.value = "start";
    startbutton.disabled = null;
}



var drawLoop = () => {
    requestAnimFrame(drawLoop);
    ctx.clearRect(0, 0, vid.width, vid.height);
    dctx.clearRect(0, 0, vid.width, vid.height);
    pos = ctrack.getCurrentPosition()

    if (pos) {
        console.log(pos);
    //   Object.keys(applyFcns).forEach(function(key) {
    //     applyFcns[key]();
    //   });
      applyEyebrows(pos, canvas, drawingPad);
      // applyBlush();
      // applyLips();
      // applyEyeliner();
      // applyEyeshadow();
        // ctrack.draw(overlay);
    }
}

// function pouch(){
//     console.log("meow");
// }

// // module.exports = {
// //     pouch: pouch
// // }

// export default pouch;

