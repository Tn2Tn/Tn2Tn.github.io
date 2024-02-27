"use strict";

// Check if the user is using an iOS device
let isIOS = (/iPad|iPhone|iPod/.test(navigator.platform)) ||
            ((navigator.platform === 'MacIntel') && (navigator.maxTouchPoints > 1));

// Check if the user is using iPadOS
let isIPadOs = window.AuthenticatorAssertionResponse === undefined &&
               window.AuthenticatorAttestationResponse === undefined &&
               window.AuthenticatorResponse === undefined &&
               window.Credential === undefined &&
               window.CredentialsContainer === undefined &&
               window.DeviceMotionEvent !== undefined &&
               window.DeviceOrientationEvent !== undefined &&
               navigator.maxTouchPoints === 5 &&
               navigator.plugins.length === 0 &&
               navigator.platform !== "iPhone";

// Function to check if the user is using an iPad
function isIPad() {
  return (/\b(iPad)\b/.test(navigator.userAgent) && /WebKit/.test(navigator.userAgent) && !window.MSStream) ||
         (navigator.platform === 'MacIntel' && navigator.maxTouchPoints && navigator.maxTouchPoints === 5);
}

// Function to set background image to none if on an Apple device
function setBackground() {
  if (isIOS || isIPadOs || isIPad()) {
    document.body.style.backgroundImage = "none";
  }
}

// Call the function when the page loads
window.onload = setBackground;


// Function to pick a random comment
function pickRandomComment(comments) {
  return comments[Math.floor(Math.random() * comments.length)];
}

// Accessing the HTML element where you want to display the variable
var outputElement = document.getElementById("message");

// Fetching comments from the text file
fetch("comments.txt")
  .then((response) => response.text())
  .then((text) => {
    const comments = text.split("\n").filter((comment) => comment.trim() !== "");
    // Pick a random comment
    var message = pickRandomComment(comments);
    // Setting the content of the HTML element to the variable value
    outputElement.innerHTML = message;
  })
  .catch((error) => {
    console.error("Error fetching comments:", error);
  });
