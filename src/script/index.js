'use strict';

/**
 * JavaScript Basics
 * Jodi-Ann Barrett
 * 
 * The audio object
 * 
 * The Audio() constructor creates and returns a new HTMLAudioElement which can be 
 * either attached to a document for the user to interact with and/or listen to, 
 * or can be used offscreen to manage and play audio
 * */

// Utility Functions 
function onEvent(event, selector, callback) {
  return selector.addEventListener(event, callback);
}

// Select HTML element by class, id and html element
function select(selector, parent = document) {
  return parent.querySelector(selector);
}

// Print
function print(arg) {
  console.log(arg);
}

/**--------------------------------------------------------------------------- */
// user input
const timeEntered = select('.input');

// start
const startBtn = select('.start');

// current time
let currentTime = '';

// Alarm audio
const alarm = new Audio('./assets/audio/alarm.mp3');
alarm.type = 'audio/mp3';

function startTime() {

  const time = select('.time');
  const today = new Date();

  let hour = formatHoursTo12(today);
  let minute = today.getMinutes();
  let second = today.getSeconds();
  minute = minute.toString().padStart(2, '0'); // pad leading 0 if value is less than 10
  second = second.toString().padStart(2, '0'); // pad leading 0 if value is less than 10

  const timeArr = []; // array to hold full time

  timeArr.push(`${hour.toString().padStart(2, '0')}`);
  timeArr.push(`${minute}`);
  timeArr.push(`${second}`);

  time.innerHTML = timeArr.join(' : ');
  currentTime = timeArr.join('');
  print(currentTime);
  setTimeout(startTime, 500);
}

// format hour to 12-hour format
function formatHoursTo12(date) {
  return date.getHours() % 12 || 12;
}

// Start time on window load
onEvent('load', window, () => {
  startTime();
  timeEntered.value = '';
});

// set alarm
onEvent('click', startBtn, () => {
  
});

// Validate user input as it is typed
onEvent('keyup', timeEntered, function() {
  // print(this.value);
});