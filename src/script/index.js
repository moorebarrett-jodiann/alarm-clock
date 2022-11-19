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

const liveTime = select('.time');
const startBtn = select('.start');
const play = new Audio('./src/audio/alarm.mp3');
play.type = 'audio/mp3';
let alarmHour;
let alarmMinute;
let alarmMessage = select('.message');

setInterval(function() {
  let today = new Date();

  let currHour = formatHoursTo12(today);
  let currMinute = today.getMinutes();
  let currSecond = today.getSeconds();

  liveTime.innerHTML = currHour + ":" + currMinute + ":" + currSecond;
  if (currHour == alarmHour && currMinute == alarmMinute) {
    setTimeout(() => { 
      liveTime.style.color = '#33ab4e';
      start.play();
    }, 10_000);
  }

}, 500);

// display the alarm the user has set
function newAlarm(hour, minute) {
  alarmHour = hour;
  alarmMinute = minute;
  let message = `<i class="fa-solid fa-bell"></i> <span>${hour}:</span><span>${minute}</span>`;
  alarmMessage.innerHTML = message;
}

// generate the alarm the user has set and clear input
function addAlarm() {
  const userInput = select('.user-input');
  const userInputVal = userInput.value.trim();
  const userInputArr = userInputVal.split(':');
  let hour = parseInt(userInputArr[0]);
  let minute = parseInt(userInputArr[1]);
  if (hour, minute) {
    newAlarm(hour, minute);
    userInput.value = "";
  }
};

// format hour to 12-hour format
function formatHoursTo12(date) {
  return date.getHours() % 12 || 12;
}

// on button click make alarm target visible
onEvent('click', startBtn, () => {
  const userInput = select('.user-input').value.trim();
  console.log(userInput);
  addAlarm();
});

