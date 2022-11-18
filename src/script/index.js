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
