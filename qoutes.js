const quotes = [
    {
        text: "Nobody's perfect. Except, of course, Tns.",
        highlight: "Tns"
    },
    {
        text: "Some people have brains. Others have Tn.",
        highlight: "Tn"
    },
    {
        text: "Behind every great achievement is a Tn taking the credit.",
        highlight: "a Tn taking the credit"
    },
    {
        text: "A bad worker blames his tools. A bad Tn does not exist.",
        highlight: "A bad Tn does not exist"
    },
    {
        text: "There's no such thing as a stupid question. Unless a Tn is asking it.",
        highlight: "a Tn is asking it"
    },
    {
        text: "They say pride comes before a fall. Tns have nothing to worry about.",
        highlight: "Tns have nothing to worry about"
    },
    {
        text: "Some people have potential. Others have Tn.",
        highlight: "Tn"
    },
    {
        text: "The trouble with being the best is everyone else has to settle for second.",
        highlight: "being the best"
    },
    {
        text: "Tns don't need a plan B. Plan A usually works.",
        highlight: "Plan A usually works"
    },
    {
        text: "Some people arrive fashionably late. Others make everyone glad they waited.",
        highlight: "Others make everyone glad they waited"
    },
    {
        text: "Tns don't check the weather. The weather checks with them.",
        highlight: "The weather checks with them"
    },
    {
        text: "Tns don't miss a beat. The beat waits for them.",
        highlight: "The beat waits for them"
    },
    {
        text: "A Tn doesn't run out of things to say. Everyone else runs out of time.",
        highlight: "Everyone else runs out of time"
    },
    {
        text: "Tns don't follow trends. Trends eventually catch up.",
        highlight: "Trends eventually catch up"
    },
    {
        text: "Some people have a way with words. Others have a way with everyone else's words.",
        highlight: "a way with everyone else's words"
    },
    {
        text: "A Tn never loses an argument. Sometimes they just let the other person finish.",
        highlight: "Sometimes they just let the other person finish"
    },
    {
        text: "A Tn's presence is like Wi-Fi. Everything works better when they're around.",
        highlight: "Everything works better when they're around"
    },
    {
        text: "Tns have two speeds: fast and already finished.",
        highlight: "fast"
    },
    {
        text: "Some people bring baggage. Tns bring the entire airport.",
        highlight: "the entire airport"
    },
    {
        text: "They say money can't buy class. Tns clearly got lucky.",
        highlight: "Tns clearly got lucky"
    },
    {
        text: "Some people are good company. Others are Tn company.",
        highlight: "Tn company"
    },
    {
        text: "Behind every great excuse is a Tn who saw it coming.",
        highlight: "a Tn who saw it coming"
    },
    {
        text: "The best things in life are worth waiting for. Tns included.",
        highlight: "Tns included"
    },
    {
        text: "They say the grass is always greener on the other side. Tns own the lawn.",
        highlight: "Tns own the lawn"
    },
    {
        text: "Some people have all the answers. Others have Tn.",
        highlight: "Tn"
    },
    {
        text: "A little competition never hurt anyone. Unless they're competing with a Tn.",
        highlight: "Unless they're competing with a Tn"
    },
    {
        text: "They say first impressions last. Tns make sure of it.",
        highlight: "Tns make sure of it"
    },
    {
        text: "Some people just get it. The rest need a Tn.",
        highlight: "The rest need a Tn"
    },
    {
        text: "You can't put a price on good taste. Or a Tn.",
        highlight: "Or a Tn"
    },
    {
        text: "They say seeing is believing. Tns are living proof.",
        highlight: "Tns are living proof"
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
  font-size: min(13vw, 11vh);
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
