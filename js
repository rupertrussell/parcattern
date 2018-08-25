//////////////////////////////////////////////////////////////////////////
//                       //                                             //
//   -~=Manoylov AC=~-   //                Parcattern I                 //
//                       //                                             //
//////////////////////////////////////////////////////////////////////////
//                                                                      //
// Controls:                                                            //
//    mouse                                                             //
//      L click: generate new pattern                                   //
//      M click: switch between bw and color mode                       //
//                                                                      //
//    keyboard                                                          //
//        'g': generate new pattern                                     //
//        'b': switch between bw and color mode                         //
//////////////////////////////////////////////////////////////////////////
//                                                                      //
// Contacts:                                                            //
//    http://manoylov.tumblr.com/                                       //
//    https://codepen.io/Manoylov/                                      //
//    https://www.openprocessing.org/user/23616/                        //
//    https://twitter.com/ManoylovAC                                    //
//    https://www.facebook.com/epistolariy                              //
//////////////////////////////////////////////////////////////////////////


// "Parcattern_I" by Manoylov AC
// http://www.openprocessing.org/sketch/516672
// Licensed under Creative Commons Attribution ShareAlike
// https://creativecommons.org/licenses/by-sa/3.0https://creativecommons.org/licenses/GPL/2.0/


'use strict';
(function() {
  var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    width = 500, height = 500;

  var HALF_PI = Math.PI / 2;
  var blockSize, circNum, sivId, radius, idx;
  var isColorMode = true;
  var bgClr = '#fafafa';
  var colors = ['#152A3B', '#158ca7', '#F5C03E', '#D63826', '#0F4155', '#7ec873', '#4B3331'];

  function start() {
    setup();
  }

  function setup() {
    canvas.width  = width;
    canvas.height = height;
    ctx.lineCap = 'butt';
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(0,0,0,.8)';
    sivId = setInterval(function () { genParcattern(); }, 2500);
    background(90);
    setEventListeners();
    draw();
  }

  function draw() {
    genParcattern();
  }

  function setEventListeners() {
    canvas.addEventListener('mousedown', mouseDn);
    document.addEventListener('keypress', keyPress);

    setBtnClickEvent('n-generate', 'g');
    setBtnClickEvent('switch-bw-color', 'b');

    function setBtnClickEvent(elemId, action) {
      document.getElementById(elemId).addEventListener('click', function() {
        keyPress(action); if (sivId) { clearInterval(sivId); } });
    }
  }

  function keyPress(e) {
    var eventKey = e.key ? e.key.toLowerCase() : e;
    switch(eventKey) {
      case 'g': genParcattern(); break;
      case 'b': isColorMode = !isColorMode; genParcattern(); break;
    }
  }

  function mouseDn(evt) {
    if (sivId) { clearInterval(sivId); }
    if(evt.button === 0) {
      genParcattern();
    } else if(evt.button === 1) {
      isColorMode = !isColorMode; genParcattern();
    }
  }

  function genParcattern() {
    circNum = ~~random(4, 10);
    blockSize = ~~random(30, 64);

    if (isColorMode) { bgClr = colors[colors.length - 1]; } else { bgClr = '#fafafa'; }
    background(bgClr);

    for(var y = blockSize/2; y < height+blockSize ; y+= blockSize){
      for(var x = blockSize/2; x < width+blockSize ; x+= blockSize){
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(HALF_PI * Math.round(random(4)));

        for(idx = circNum; idx > 0; --idx){
          radius = blockSize * idx / (circNum + 1);
          if(idx < 2 || !isColorMode){ ctx.fillStyle = bgClr;} else{ ctx.fillStyle = colors[separateIdx(idx - 1, circNum + 1)]; }
          arc(-blockSize/2, -blockSize/2, radius, 0, HALF_PI, true, true);
        }

        for(idx = circNum; idx > 0; --idx){
          radius = blockSize * idx / (circNum + 1);
          if(idx < 2 || !isColorMode){ ctx.fillStyle = bgClr; } else { ctx.fillStyle = colors[separateIdx(idx - 1, circNum + 1)]; }
          arc(-blockSize/2+blockSize, -blockSize/2+blockSize, radius, Math.PI, Math.PI + HALF_PI, true, true);
        }
        ctx.restore();
      }
    }

    colors = shuffleArray(colors);
  }

  function separateIdx(idx, length){
    return Math.floor(Math.abs(idx - (length - 1) / 2 ));
  }

  function shuffleArray(array) {
    var j, temp;
    for (var i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Helper Functions //////////////////////////////////////////////////////////////////////////////////////////

  function random (min, max){
    if (!min && min !== 0) {
      return Math.random();
    } else if (!max) {
      return Math.random() * min;
    }

    return Math.random() * (max - min) + min;
  }

  function background(clr) {
    ctx.save();
    ctx.fillStyle = clr || "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }

  function arc(x, y, rds, sAgl, eAgl, isFill, isStroke) {
    if (isFill) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.arc(x, y, rds, sAgl, eAgl);
      ctx.fill();
    }
    if (isStroke) {
      ctx.beginPath();
      ctx.arc(x, y, rds, sAgl, eAgl);
      ctx.stroke();
    }
  }

  start();
})();
