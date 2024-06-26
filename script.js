"use strict";

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
