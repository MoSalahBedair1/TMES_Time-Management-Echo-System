$(function () {

  /* === Spiraldex Section === */

  class Circle {
    constructor() {
      this.make = function (circleName, circleWidth, noLeftSide) {
        var
        circleName = document.querySelector(`.${circleName}`),
        circleWidth = circleWidth,
        circleWidthPercent = circleWidth + '%',
        circleHeight = circleWidth * 2,
        circleHeightPercent = circleHeight + '%';
        
        circleName.style.width = `${circleWidthPercent}`;
        circleName.style.height = `${circleHeightPercent}`;

        var 
        circleHeightPx = circleName.getBoundingClientRect().height,
        circleHeightPxString = circleHeightPx + 'px';

        if (noLeftSide === true) {

          circleName.style.borderTopLeftRadius = 0;
          circleName.style.borderTopRightRadius = circleHeightPxString;
          circleName.style.borderBottomRightRadius = circleHeightPxString;
          circleName.style.borderBottomLeftRadius = 0;


        } else {

          circleName.style.borderTopLeftRadius = circleHeightPxString;
          circleName.style.borderTopRightRadius = 0;
          circleName.style.borderBottomRightRadius = 0;
          circleName.style.borderBottomLeftRadius = circleHeightPxString;

        }

      };
    }
  }

let circle1New = new Circle(),
circle2New = new Circle(),
circle3New = new Circle(),
circle4New = new Circle(),
circle5New = new Circle(),
circle6New = new Circle();

circle1New.make('circle1', '5', true);
circle2New.make('circle2', '10', false);
circle3New.make('circle3', '15', true);
circle4New.make('circle4', '20', false);
circle5New.make('circle5', '25', true);
circle6New.make('circle6', '30', false);


/* === Start Control Panel Section === */

// Start From-To Section

// Start Validate The Inputs

// if any text input field is empty, it will be '00' when out of focus && if it's anything except numbers, you will be notified

var FromToSelectors = [".from-hours", ".from-minutes", ".from-seconds", ".to-hours", ".to-minutes", ".to-seconds"];

FromToSelectors.forEach(selector => {
  $(`${selector}`).on('input', function () {
    if (Number.isNaN(Number(($(`${selector}`).val()))) && $(`${selector}`).val() != '00' && $(`${selector}`).val() != '0' && $(`${selector}`).val() != '') {
      $(`${selector}`).css({
        'outline-color': 'red'
      })
    } else {
      $(`${selector}`).css({
        'outline-color': 'black'
      })
    } $(`${selector}`).on('blur', function () {
      $(`${selector}`).off('blur'); // Cutting The Ear Of The Event Listener hahaha :"D
      if ($(`${selector}`).val() == '' || Number.isNaN(Number(($(`${selector}`).val())))) {
        $(`${selector}`).val('00');
      }
      if (Number($(`${selector}`).val()) < 10) {
      $(`${selector}`).val('0' + Number($(`${selector}`).val()));
    }
  })
  });
});

var 
num = 1,
storedFromH = 0;

$('.add').click(function () {

  // Add An Input Checker Code Later

var
fromS = parseInt($('.from-seconds').val()),
fromM = parseInt($('.from-minutes').val()),
fromH = parseInt($('.from-hours').val()),
toS = parseInt($('.to-seconds').val()),
toM = parseInt($('.to-minutes').val()),
toH = parseInt($('.to-hours').val()),
StartPosition = fromS * 0.0083333333333333 + fromM * 0.5 + fromH * 30,
EndPosition = toS * 0.0083333333333333 + toM * 0.5 + toH * 30,
totalSDeg = (toS < fromS ? (60 - fromS + toS) * 0.0083333333333333 : (toS - fromS) * 0.0083333333333333),
totalMDeg = (toM < fromM ? (60 - fromM + toM) * 0.5 : (toM - fromM) * 0.5),
// edit total hour, test: from 13:04:34 to 14:04:34 && 13:04:34 to 15:00:00
totalHDeg = (toM < fromM && toM == 0 && toH == fromH + 1) ? 0 : ((fromH == 0 && fromM == 0 && fromS == 0) ? (toH - fromH) * 30 : (fromH == 0 && fromM != 0) ? 0 : (fromH == 0 && fromS != 0) ? 0 : (toH - fromH) * 30),
totalDeg = totalSDeg + totalMDeg + totalHDeg,
color = $('.from-to-color').val();

class Circle3Add {
  constructor() {
      if (toH != storedFromH + 1) {
      $('.circle3').prepend(`<div class='empty' style='
      width: 99.75px;
      height: 199.5px;
      background-color: white;
      position: absolute;
      right: 100%;
      top: -3px;
      transform-origin: right center;
      transition: transform 0.5s linear;
      transform: rotate(${StartPosition}deg);'></div>`);

      $('.circle3').prepend(`<div class='fill${num}-circle3' style='
      width: 99.75px;
      height: 199.5px;
      background-color: ${color};
      position: absolute;
      right: 100%;
      top: -3px;
      transform-origin: right center;
      transition: transform 0.5s linear;
      transform: rotate(${StartPosition}deg);'></div>`);
    }
  }
}

if (StartPosition < 180 && EndPosition <= 180) { // Start In Circle3 And End In Circle3

  new Circle3Add();

  storedFromH = fromH;

  window.setTimeout(() => {$(`.fill${num}-circle3`).css('transform',`rotate(${StartPosition + totalDeg}deg)`);num++}, 50);

} else if (StartPosition < 180 && EndPosition > 180 && EndPosition <= 360) { // Start In Circle3 And End In Circle4

  var complete = 180 - StartPosition; // to complete from start position to end of the circle 1

  new Circle3Add();

  storedFromH = fromH;

  window.setTimeout(() => {$(`.fill${num}-circle3`).css('transform',`rotate(${StartPosition + complete}deg)`)}, 50)

  $('.circle4').prepend(`<div class='fill${num}-circle4' style='
  width: 133px;
  height: 266;
  background-color: ${color};
  position: absolute;
  left: 100%;
  bottom: -3px;
  transform-origin: left center;
  transition: transform 0.3s linear;
  transform: rotate(0deg);'></div>`);

  window.setTimeout(() => {$(`.fill${num}-circle4`).css('transform',`rotate(${(EndPosition - 180)}deg)`);num++}, 550);

} else if (StartPosition < 180 && EndPosition > 360 && EndPosition <= 540) { // Start In Circle3 And End In Circle5

  var complete = 180 - StartPosition; // to complete from start position to end of the circle 1

  new Circle3Add;

  storedFromH = fromH;

  window.setTimeout(() => {$(`.fill${num}-circle3`).css('transform',`rotate(${StartPosition + complete}deg)`)}, 50)

  $('.circle4').prepend(`<div class='fill${num}continued-circle4' style='
  width: 133px;
  height: 266;
  background-color: ${color};
  position: absolute;
  left: 100%;
  bottom: -3px;
  transform-origin: left center;
  transition: transform 0.3s linear;
  transform: rotate(0deg);'></div>`);

  window.setTimeout(() => {$(`.fill${num}continued-circle4`).css('transform',`rotate(${(180)}deg)`)}, 550);

  $('.circle5').prepend(`<div class='fill${num}continued-circle5' style='
  width: 166.25px;
  height: 332.5;
  background-color: ${color};
  position: absolute;
  right: 100%;
  bottom: -3px;
  transform-origin: right center;
  transition: transform 0.3s linear;
  transform: rotate(0deg);'></div>`);

  window.setTimeout(() => {$(`.fill${num}continued-circle5`).css('transform',`rotate(${EndPosition - 360}deg)`);num++}, 850);


} else if (StartPosition < 180 && EndPosition > 540 && EndPosition <= 720) { // Start In Circle3 And End In Circle6

  var complete1 = 180 - StartPosition; // to complete from start position to end of the circle 1

  new Circle3Add;

  storedFromH = fromH;

  window.setTimeout(() => {$(`.fill${num}-circle3`).css('transform',`rotate(${StartPosition + complete1}deg)`)}, 50)

  $('.circle4').prepend(`<div class='fill${num}continued-circle4' style='
  width: 133px;
  height: 266;
  background-color: ${color};
  position: absolute;
  left: 100%;
  bottom: -3px;
  transform-origin: left center;
  transition: transform 0.3s linear;
  transform: rotate(0deg);'></div>`);

  window.setTimeout(() => {$(`.fill${num}continued-circle4`).css('transform',`rotate(${(180)}deg)`)}, 550);

  $('.circle5').prepend(`<div class='fill${num}continued-circle5' style='
  width: 166.25px;
  height: 332.5;
  background-color: ${color};
  position: absolute;
  right: 100%;
  bottom: -3px;
  transform-origin: right center;
  transition: transform 0.3s linear;
  transform: rotate(0deg);'></div>`);

  window.setTimeout(() => {$(`.fill${num}continued-circle5`).css('transform',`rotate(${180}deg)`)}, 850);

  $('.circle6').prepend(`<div class='fill${num}continued-circle6' style='
  width: 199.5px;
  height: 399px;
  background-color: ${color};
  position: absolute;
  left: 100%;
  bottom: -3px;
  transform-origin: left center;
  transition: transform 0.3s linear;
  transform: rotate(0deg);'></div>`);

  window.setTimeout(() => {$(`.fill${num}continued-circle6`).css('transform',`rotate(${EndPosition - 540}deg)`);num++}, 1150);

} else if (StartPosition >= 180 && EndPosition <= 360) { // Start In Circle4 And End In Circle4

  console.log('Start In Circle4 And End In Circle4')

    if (toH != storedFromH + 1) {
      $('.circle4').prepend(`<div class='empty' style='
      width: 133px;
      height: 266px;
      background-color: white;
      position: absolute;
      left: 100%;
      top: -3px;
      transform-origin: left center;
      transition: transform 0.5s linear;
      transform: rotate(${StartPosition - 180}deg);'></div>`);
    }

    if (StartPosition == 180) {
      $('.circle4 .empty[style*=0deg]').remove();
    }

    storedFromH = fromH;

    $('.circle4').prepend(`<div class='fill${num}' style='
    width: 133px;
    height: 266;
    background-color: ${color};
    position: absolute;
    left: 100%;
    bottom: -3px;
    transform-origin: left center;
    transition: transform 0.5s linear;
    transform: rotate(${StartPosition - 180}deg);'></div>`);

    window.setTimeout(() => {$(`.fill${num}`).css('transform',`rotate(${(StartPosition - 180) + totalDeg}deg)`);num++}, 50);

  } else if (StartPosition >= 180 && StartPosition < 360 && EndPosition > 360 && EndPosition <= 540) { // Start In Circle4 And End In Circle5

    console.log('Start In Circle4 And End In Circle5')

    var complete2 = 180 - (StartPosition - 180) // To Complete from start position in circle4 to the end of cirlce4

    if (toH != storedFromH + 1) {
      $('.circle4').prepend(`<div class='empty' style='
      width: 133px;
      height: 266px;
      background-color: white;
      position: absolute;
      left: 100%;
      top: -3px;
      transform-origin: left center;
      transition: transform 0.5s linear;
      transform: rotate(${StartPosition - 180}deg);'></div>`);
    }

    if (StartPosition == 180) {
      $('.circle4 .empty[style*=0deg]').remove();
    }

    storedFromH = fromH;

    $('.circle4').prepend(`<div class='fill${num}' style='
    width: 133px;
    height: 266;
    background-color: ${color};
    position: absolute;
    left: 100%;
    bottom: -3px;
    transform-origin: left center;
    transition: transform 0.5s linear;
    transform: rotate(${StartPosition - 180}deg);'></div>`);

    window.setTimeout(() => {$(`.fill${num}`).css('transform',`rotate(${(StartPosition - 180) + complete2}deg)`)}, 50);

    $('.circle5').prepend(`<div class='fill${num}continued-circle5' style='
    width: 166.25px;
    height: 332.5;
    background-color: ${color};
    position: absolute;
    right: 100%;
    bottom: -3px;
    transform-origin: right center;
    transition: transform 0.3s linear;
    transform: rotate(0deg);'></div>`);

    window.setTimeout(() => {$(`.fill${num}continued-circle5`).css('transform',`rotate(${EndPosition - 360}deg)`);num++}, 550);

  } else if (StartPosition >= 180 && StartPosition < 360 && EndPosition > 540 && EndPosition <= 720) { // Start In Circle4 And End In Circle6

    console.log('Start In Circle4 And End In Circle6')

    var complete2 = 180 - (StartPosition - 180) // To Complete from start position in circle4 to the end of cirlce4

    if (toH != storedFromH + 1) {
      $('.circle4').prepend(`<div class='empty' style='
      width: 133px;
      height: 266px;
      background-color: white;
      position: absolute;
      left: 100%;
      top: -3px;
      transform-origin: left center;
      transition: transform 0.5s linear;
      transform: rotate(${StartPosition - 180}deg);'></div>`);
    }

    if (StartPosition == 180) {
      $('.circle4 .empty[style*=0deg]').remove();
    }

    storedFromH = fromH;

    $('.circle4').prepend(`<div class='fill${num}' style='
    width: 133px;
    height: 266;
    background-color: ${color};
    position: absolute;
    left: 100%;
    bottom: -3px;
    transform-origin: left center;
    transition: transform 0.5s linear;
    transform: rotate(${StartPosition - 180}deg);'></div>`);

    window.setTimeout(() => {$(`.fill${num}`).css('transform',`rotate(${(StartPosition - 180) + complete2}deg)`)}, 50);

    $('.circle5').prepend(`<div class='fill${num}continued-circle5' style='
    width: 166.25px;
    height: 332.5;
    background-color: ${color};
    position: absolute;
    right: 100%;
    bottom: -3px;
    transform-origin: right center;
    transition: transform 0.3s linear;
    transform: rotate(0deg);'></div>`);

    window.setTimeout(() => {$(`.fill${num}continued-circle5`).css('transform',`rotate(${180}deg)`)}, 550);
    
    $('.circle6').prepend(`<div class='fill${num}continued-circle6' style='
    width: 199.5px;
    height: 399px;
    background-color: ${color};
    position: absolute;
    left: 100%;
    bottom: -3px;
    transform-origin: left center;
    transition: transform 0.3s linear;
    transform: rotate(0deg);'></div>`);

    window.setTimeout(() => {$(`.fill${num}continued-circle6`).css('transform',`rotate(${EndPosition - 540}deg)`);num++}, 850);

  } else if (StartPosition >= 360 && EndPosition <= 540) { // Start In Circle5 And End In Circle5
    if (toH != storedFromH + 1) {
      $('.circle5').prepend(`<div class='empty' style='
      width: 166.25px;
      height: 332.5px;
      background-color: white;
      position: absolute;
      right: 100%;
      top: -3px;
      transform-origin: right center;
      transition: transform 0.5s linear;
      transform: rotate(${StartPosition - 360}deg);'></div>`);
    }
    if (StartPosition == 360) {
      $('.circle5 .empty[style*=0deg]').remove();
    }

    storedFromH = fromH;

    $('.circle5').prepend(`<div class='fill${num}' style='
    width: 166.25px;
    height: 332.5px;
    background-color: ${color};
    position: absolute;
    right: 100%;
    bottom: -3px;
    transform-origin: right center;
    transition: transform 0.5s linear;
    transform: rotate(${StartPosition - 360}deg);'></div>`);

    window.setTimeout(() => {$(`.fill${num}`).css('transform',`rotate(${ (StartPosition - 360) + totalDeg}deg)`);num++}, 50);

    console.log(StartPosition - 360, totalDeg); 

  } else if (StartPosition >= 360 && StartPosition < 540 && EndPosition > 540 && EndPosition <= 720) { // Start In Circle5 And End In Circle6

    console.log('Start In Circle5 And End In Circle6')

    if (toH != storedFromH + 1) {
      $('.circle5').prepend(`<div class='empty' style='
      width: 166.25px;
      height: 332.5px;
      background-color: white;
      position: absolute;
      right: 100%;
      top: -3px;
      transform-origin: right center;
      transition: transform 0.5s linear;
      transform: rotate(${StartPosition - 360}deg);'></div>`);
    }

    if (StartPosition == 360) {
      $('.circle5 .empty[style*=0deg]').remove();
    }

    storedFromH = fromH;

    $('.circle5').prepend(`<div class='fill${num}' style='
    width: 166.25px;
    height: 332.5px;
    background-color: ${color};
    position: absolute;
    right: 100%;
    bottom: -3px;
    transform-origin: right center;
    transition: transform 0.5s linear;
    transform: rotate(${StartPosition - 360}deg);'></div>`);

    window.setTimeout(() => {$(`.fill${num}`).css('transform',`rotate(${180}deg)`)}, 50);
    
    $('.circle6').prepend(`<div class='fill${num}continued-circle6' style='
    width: 199.5px;
    height: 399px;
    background-color: ${color};
    position: absolute;
    left: 100%;
    bottom: -3px;
    transform-origin: left center;
    transition: transform 0.3s linear;
    transform: rotate(0deg);'></div>`);

    window.setTimeout(() => {$(`.fill${num}continued-circle6`).css('transform',`rotate(${EndPosition - 540}deg)`);num++}, 550);

  } else if (StartPosition >= 540 && EndPosition <= 720) {  // Start In Circle6 And End In Circle6

    if (toH != storedFromH + 1) {
      $('.circle6').prepend(`<div class='empty' style='
      width: 199.5px;
      height: 399px;  
      background-color: white;
      position: absolute;
      left: 100%;
      top: -3px;
      transform-origin: left center;
      transition: transform 0.5s linear;
      transform: rotate(${StartPosition - 540}deg);'></div>`);
    }

    if (StartPosition == 540) {
      $('.circle6 .empty[style*=0deg]').remove();
    }

    storedFromH = fromH;

    $('.circle6').prepend(`<div class='fill${num}' style='
    width: 199.5px;
    height: 399px;
    background-color: ${color};
    position: absolute;
    left: 100%;
    bottom: -3px;
    transform-origin: left center;
    transition: transform 0.5s linear;
    transform: rotate(${StartPosition - 540}deg);'></div>`);

    window.setTimeout(() => {$(`.fill${num}`).css('transform',`rotate(${(StartPosition - 540) + totalDeg}deg)`);num++}, 50);

  }

});

// Live Clock And Clock Arrow

  // Getting The Current Date & Time

    // Getting The Current Date

var
d = new Date(),
month = d.getMonth()+1,
day = d.getDate(),

date =
(day<10 ? '0' : '') + day + '/' + 
(month<10 ? '0' : '') + month + '/' + 
d.getFullYear();

// Getting The Current Time & Real Time Clock

var span = document.getElementById('span'),
d,
h,
m,
s,
t,
tHDegree,
tMDegree,
tSDegree,
tDegree;

class TDegree {
  constructor() {
    d = new Date();
    h = d.getHours();
    m = d.getMinutes();
    s = d.getSeconds();
  
    tHDegree = h * 30;
    tMDegree = m * 0.5;
    tSDegree = s * 0.0083333333333333;
    tDegree = 1;
  }
}

class ClockArrow {
  constructor() {
  } 
  arrow(arrowPlace) {
    if (arrowPlace == 3 || arrowPlace == 5) {
    $('.clock-arrow-4-6').css({
    'display': 'none'
  })

  $('.clock-arrow-3-5').css({
    'display': 'block',
    'transform':`rotate(${tDegree}deg)`
  });
  } else if (arrowPlace == 4 || arrowPlace == 6) {
    $('.clock-arrow-3-5').css({
      'display': 'none'
    });
    
    $('.clock-arrow-4-6').css({
      'display': 'block',
      'transform': `rotate(${tDegree}deg)`
    });
  }
  }
}

arrowClock3 = new ClockArrow();
arrowClock4 = new ClockArrow();
arrowClock5 = new ClockArrow();
arrowClock6 = new ClockArrow();


function time() {

  new TDegree;

  t = `${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;

  span.textContent = t

};

time();

// checking where the arrow is

if (tDegree <= 180) { // Starts At Circle 3

  new TDegree;

  function ArrowInCircle3() {

    if (tDegree > 540 && tDegree <= 720) {
      arrowClock6.arrow(6);
    } else if (tDegree > 360 && tDegree <= 540 ) { 
      arrowClock5.arrow(5);
    } else if (tDegree > 180 && tDegree <= 360) {
      arrowClock4.arrow(4);
    } else if (tDegree <= 180) {
      arrowClock3.arrow(3);
    }

    if (tDegree < 720) { // this condition is for testing and it will be deleted, not it's body
    tDegree++;
    console.log(tDegree);
    }

  }

  ArrowInCircle3();
  setInterval(ArrowInCircle3, 5); // the 5 ms is for testing


} else  if (tDegree > 180 && tDegree <= 360) { // Starts At Circle 4

    new TDegree;
    arrowClock4 = new ClockArrow();

  function ArrowInCircle4() {

  }

  ArrowInCircle4();
  setInterval(ArrowInCircle4, 1000);

} else if (tDegree > 360 && tDegree <= 540 ) { // Starts At Circle 5

    new TDegree;
    arrowClock5 = new ClockArrow();

  function ArrowInCircle5() {

  }

  ArrowInCircle5();
  setInterval(ArrowInCircle5, 1000);

} else if (tDegree > 540 && tDegree <= 720) { // Starts At Circle 6

    new TDegree;
    arrowClock6 = new ClockArrow();

  function ArrowInCircle6() {

}

  ArrowInCircle6();
  setInterval(ArrowInCircle6, 1000);
}

});