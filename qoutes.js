const quotes = [
    {
        text: "Do It Now.",
        highlight: "It Now."
    },
    {
        text: "Be Grateful.",
        highlight: "Grateful."
    },
    {
        text: "Live With Less.",
        highlight: "Live"
    },
    {
        text: "Accept And Embrace All Experiences.",
        highlight: "Accept And Embrace"
    },
    {
        text: "Do The Things You Love.",
        highlight: "Things You Love."
    },
    {
        text: "You Are Awesome.",
        highlight: "Awesome."
    },
    {
        text: "Plan For Victory, Learn From Defeat.",
        highlight: "Victory"
    },
    {
        text: "Open Your Heart.",
        highlight: "Heart."
    },
    {
        text: "You Can Do It.",
        highlight: "You Can"
    },
    {
        text: "Find Joy In The Ordinary.",
        highlight: "Find Joy"
    },
    {
        text: "Be Yourself.",
        highlight: "Yourself."
    },
    {
        text: "Persistence Powers Passion.",
        highlight: "Powers Passion."
    },
    {
        text: "Breathe.",
        highlight: "Breathe."
    },
    {
        text: "Be A Victor, Not A Victim.",
        highlight: "A Victor"
    },
    {
        text: "Be A Magnet For Joy, Love And Abundance.",
        highlight: "Magnet"
    },
    {
        text: "Illuminate The Beauty In Others.",
        highlight: "Illuminate"
    },
    {
        text: "Be Happy.",
        highlight: "Happy."
    },
    {
        text: "Create Every Day.",
        highlight: "Every Day."
    },
    {
        text: "Invest In Yourself.",
        highlight: "Yourself."
    },
    {
        text: "Run Your Own Race.",
        highlight: "Run"
    },
    {
        text: "Maintain Your Balance.",
        highlight: "Your Balance."
    },
    {
        text: "Empty Your Cup.",
        highlight: "Your Cup."
    },
    {
        text: "Be Fearless.",
        highlight: "Fearless."
    },
    {
        text: "Be Kind To Yourself.",
        highlight: "Yourself."
    },
    {
        text: "Bet On Yourself.",
        highlight: "Yourself."
    },
    {
        text: "Every Day Is Another Chance.",
        highlight: "Another Chance."
    },
    {
        text: "Because You Can.",
        highlight: "You Can."
    },
    {
        text: "Live Less Out Of Habit And More Out Of Intent.",
        highlight: "More Out Of Intent."
    },
    {
        text: "Baby Steps.",
        highlight: "Baby Steps."
    },
    {
        text: "Keep Moving Forward.",
        highlight: "Moving Forward."
    },
    {
        text: "Create The Life You Want.",
        highlight: "Life."
    }
];


// Set Today's Quote
const today = new Date().getDate();
const todayQuote = quotes[(today - 1) % quotes.length];

// Highlighted part
const highlightedPart = todayQuote.highlight;
const text = todayQuote.text;

// Use a regular expression to match the highlighted phrase (handling multiple words)
const regex = new RegExp(`(${highlightedPart})`, 'gi');

// Replace the highlighted phrase with a span that applies the glow effect
const formattedQuote = text.replace(regex, `<span class="glow-filter" data-text="$1">$1</span>`);

// Update the page with the formatted quote
document.getElementById("dailyQuote").innerHTML = formattedQuote;

// Function to open and close overlay
function openQuote() {
    document.getElementById("quoteOverlay").style.display = "flex";
}

function closeQuote() {
    document.getElementById("quoteOverlay").style.display = "none";
}

// Add CSS styles
document.head.insertAdjacentHTML("beforeend", `<style> 
svg.filters {
  height: 0;
  width: 0;
  position: absolute;
  z-index: -1;
}
.header-text {
  color: #63687d;
  font-size: 11vh;
  text-align: center;
  line-height: 1.0625;
  font-weight: 600;
  letter-spacing: -0.009em;
}
.glow-filter {
  position: relative;
  display: inline-grid;
  scale: 1;
  animation: onloadscale 1s ease-out forwards;
  justify-items: center;
}
.glow-filter::before {
  content: attr(data-text);
  position: absolute;
  pointer-events: none;
  color: #63687d;
  background: linear-gradient(0deg, #9FA8DA 0%, #d4d8f0 50%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: url(#glow-4);
  opacity: 0;
  animation: onloadopacity 1s ease-out forwards;
}
@keyframes onloadscale {
  24% {
      scale: 1;
  }
  100% {
      scale: 1.02;
  }
}
@keyframes onloadopacity {
  24% {
      opacity: 0;
  }
  100% {
      opacity: 1;
  }
}

p {
  color: #63687d;
  font-weight: 600;
  background: linear-gradient(0deg,#86868b 0%, #afa8a8 80%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  top: 0;
  margin: auto;
  height: fit-content;
  max-width: 28em;
  text-align: center;
}

.bg {
  display: flex;
  max-width: 44em;
}
.bg > div {
  position: absolute;
  scale: 1.2;
  opacity: 0.6;
}
.bg > div:nth-child(1) {
  width: 100%;
  height: 60vh;
  border-radius: 100em;
  box-shadow: inset 0 0 4em 3em rgba(175, 200, 238, 0.2), inset 0 0 2em 0.4em rgba(175, 200, 238, 0.2), 0 0 0.1em 0.1em rgba(175, 200, 238, 0.2), 0 0 1em 0.4em rgba(175, 200, 238, 0.3);
  top: -85vh;
  animation: onloadbgt 1s ease-in-out forwards;
}
.bg > div:nth-child(2) {
  width: 100%;
  height: 60vh;
  border-radius: 100em;
  box-shadow: inset 0 0 4em 3em rgba(175, 200, 238, 0.2), inset 0 0 2em 0.4em rgba(175, 200, 238, 0.2), 0 0 0.1em 0.1em rgba(175, 200, 238, 0.2), 0 0 1em 0.4em rgba(175, 200, 238, 0.3);
  animation: onloadbgb 1s ease-in-out forwards;
  bottom: -85vh;
}
@keyframes onloadbgt {
  0% {
        opacity: 0.3;
  }
  100% {
      opacity: 0.8;
  }
}
@keyframes onloadbgb {
  0% {
      opacity: 0.3;
  }
  100% {
      opacity: 0.8;
  }
} </style>`);
