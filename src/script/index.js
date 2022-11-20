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

// Data
const liveTime = select('.time');
const startBtn = select('.start');
const snoozeBtn = select('.snooze');
const alarmMessage = select('.message');

let alarmHour;
let alarmMinute;

const play = new Audio('./src/audio/alarm.mp3');
play.type = 'audio/mp3';

// function that updates clock every 1 second
setInterval(function() {
  let today = new Date();
  let currHour = formatHoursTo12(today);
  let currMinute = today.getMinutes();
  let currSecond = today.getSeconds();

  liveTime.innerHTML = 
    padStart(currHour) + 
    " : " + 
    padStart(currMinute) + 
    " : " + 
    padStart(currSecond);

  if (currHour == alarmHour && currMinute == alarmMinute) {
    setTimeout(() => { 
      play.play();
      liveTime.style.color = '#33ab4e';
      startBtn.style.display = 'none';
      snoozeBtn.style.display = 'inline-block';
    });
  }
  
}, 1000);

// display the alarm the user has set
function displayAlarm(hour, minute) {
  alarmHour = hour;
  alarmMinute = minute;
  let message = `<i class="fa-solid fa-bell"></i><span>${padStart(hour)} : </span><span>${padStart(minute)}</span>`;
  alarmMessage.innerHTML = message;
  alarmMessage.classList.remove('error');
}

// set the alarm the user has defined and clear input
function setAlarm() {
  const userInput = select('.user-input');

  if(userInput.value !== "") {

    const userInputVal = userInput.value.trim();
    const userInputArr = userInputVal.split(':'); // split user input into hour and minutes
  
    let hour = parseInt(userInputArr[0]);
    let minute = parseInt(userInputArr[1]);
  
    if (hour && minute) {
      displayAlarm(hour, minute);
      userInput.value = "";
    }

  } else {
    let message = `<i class="fa-solid fa-xmark"></i><span>Please set an alarm</span>`;
    alarmMessage.innerHTML = message;
    alarmMessage.classList.add('error');
  }
};

// format hour to 12-hour format
function formatHoursTo12(date) {
  return date.getHours() % 12 || 12;
}

// pad values less than 10 with leading 0
function padStart(value) {
  return value.toString().padStart(2, '0');
}

// on button click make alarm target visible
onEvent('click', startBtn, function(event) {
  event.preventDefault();
  const userInput = select('.user-input').value.trim();
  setAlarm();
});

// on button click snooze alarm
onEvent('click', snoozeBtn, function() {
  window.location.reload();
});

// when page is reloaded clear input
onEvent('load', window, () => {
  const userInput = select('.user-input');
  userInput.value = "";
});

