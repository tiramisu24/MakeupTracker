//set up
const canvas = document.getElementById('overlay');
const ctx = canvas.getContext('2d');
const vid = document.getElementById('video');
vid.addEventListener('canplay', enablestart, false);

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

startVideo = () => {
    vid.play();
    ctrack.start(vid);
    // unlockMakeUp();
    trackingStarted = true;

    drawLoop();
  }

drawLoop = () => {
    requestAnimFrame(drawLoop);
    ctx.clearRect(0, 0, vid.width, vid.height);
    pos = ctrack.getCurrentPosition()

    if (pos) {
    //   setPos();
    //   Object.keys(applyFcns).forEach(function(key) {
    //     applyFcns[key]();
    //   });
      // applyEyebrows();
      // applyBlush();
      // applyLips();
      // applyEyeliner();
      // applyEyeshadow();
        ctrack.draw(overlay);
    }
  }
