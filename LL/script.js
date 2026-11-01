/*
 * Tn² LL — Audio Shorts
 *
 * Features:
 * - Finite, non-looping shorts list
 * - Keyboard, touch, mouse wheel and trackpad scrolling
 * - Shared audio player
 * - Speed-adjusted vinyl rotation
 * - Original daily quotes and glow effect
 */


/* =====================================
   SHORTS PLAYLIST
===================================== */

const SHORTS = [
  {
    title: "Episode 1",
    description: "Audio short 1",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    artwork: "2L.png"
  },
  {
    title: "Episode 2",
    description: "Audio short 2",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    artwork: "2L.png"
  },
  {
    title: "Episode 3",
    description: "Audio short 3",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    artwork: "2L.png"
  },
  {
    title: "Episode 4",
    description: "Audio short 4",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    artwork: "2L.png"
  },
  {
    title: "Episode 5",
    description: "Audio short 5",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    artwork: "2L.png"
  },
  {
    title: "Episode 6",
    description: "Audio short 6",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    artwork: "2L.png"
  },
  {
    title: "Episode 7",
    description: "Audio short 7",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    artwork: "2L.png"
  },
  {
    title: "Episode 8",
    description: "Audio short 8",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    artwork: "2L.png"
  },
  {
    title: "Episode 9",
    description: "Audio short 9",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    artwork: "2L.png"
  },
  {
    title: "Episode 10",
    description: "Audio short 10",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    artwork: "2L.png"
  },
  {
    title: "Episode 11",
    description: "Audio short 11",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    artwork: "2L.png"
  },
  {
    title: "Episode 12",
    description: "Audio short 12",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    artwork: "2L.png"
  },
  {
    title: "Episode 13",
    description: "Audio short 13",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
    artwork: "2L.png"
  },
  {
    title: "Episode 14",
    description: "Audio short 14",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
    artwork: "2L.png"
  },
  {
    title: "Episode 15",
    description: "Audio short 15",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
    artwork: "2L.png"
  },
  {
    title: "Episode 16",
    description: "Audio short 16",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
    artwork: "2L.png"
  },
  {
    title: "Episode 17",
    description: "Audio short 17",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3",
    artwork: "2L.png"
  },
  {
    title: "Episode 18",
    description: "Audio short 18",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-18.mp3",
    artwork: "2L.png"
  },
  {
    title: "Episode 19",
    description: "Audio short 19",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-19.mp3",
    artwork: "2L.png"
  },
  {
    title: "Episode 20",
    description: "Audio short 20",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-20.mp3",
    artwork: "2L.png"
  },
  {
    title: "Episode 21",
    description: "Audio short 21",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-21.mp3",
    artwork: "2L.png"
  },
  {
    title: "Episode 22",
    description: "Audio short 22",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-22.mp3",
    artwork: "2L.png"
  },
  {
    title: "Episode 23",
    description: "Audio short 23",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-23.mp3",
    artwork: "2L.png"
  }
];


/* =====================================
   ORIGINAL DAILY QUOTES
===================================== */

const quotes = [
  {
    text: "Whether you think you can or think you can't, you're right.",
    highlight: "you're right."
  },
  {
    text: "You miss 100% of the shots you don't take.",
    highlight: "the shots you don't take."
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
    text: "Whether you think you can, or you can think Power on.",
    highlight: "Power on"
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
    text: "A bad worker blames his tools, a bad Tn Does not exist.",
    highlight: "Does not exist."
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
    text: "Light is needed to create a shadow.",
    highlight: "Light is needed."
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
    text: "I have my patience, I just don’t use it before coffee.",
    highlight: "before coffee."
  },
  {
    text: "Be Kind To Yourself.",
    highlight: "Yourself."
  },
  {
    text: "Knowing yourself is the beginning of all wisdom.",
    highlight: "all wisdom."
  },
  {
    text: "Every Day Is Another Chance.",
    highlight: "Another Chance."
  },
  {
    text: "The early bird gets the worm, but the second mouse gets the cheese.",
    highlight: "the second mouse gets the cheese."
  },
  {
    text: "Live Less Out Of Habit And More Out Of Intent.",
    highlight: "More Out Of Intent."
  },
  {
    text: "I’m not arguing. I’m just explaining why I’m right.",
    highlight: "why I’m right."
  },
  {
    text: "If at first you don’t succeed, look in the instructions.",
    highlight: "look in the instructions."
  },
  {
    text: "Some days you’re the pigeon. Some days you’re the statue.",
    highlight: "the statue."
  }
];


/* =====================================
   ELEMENTS
===================================== */

const container = document.getElementById("shortsContainer");
const audioPlayer = document.getElementById("audioPlayer");

const eqLeft = document.getElementById("eqLeft");
const eqRight = document.getElementById("eqRight");

const quoteOverlay = document.getElementById("quoteOverlay");
const dailyQuote = document.getElementById("dailyQuote");
const quoteTrigger = document.getElementById("quoteTrigger");


/* =====================================
   PLAYER STATE
===================================== */

const SPEEDS = [1, 1.25, 1.5, 1.75, 2, 16];

let allCards = [];

let activeCard = null;
let activeIndex = -1;
let currentAudioIndex = -1;

let currentSpeedIndex = 0;
let audioContext = null;
let audioAnalyser = null;
let audioSourceNode = null;
let eqAnimationFrame = 0;
let eqFrequencyData = null;
let eqBars = [];



/* =====================================
   SAFE HTML TEXT
===================================== */

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}


/* =====================================
   FORMAT TIME
===================================== */

function formatTime(value) {
  if (!Number.isFinite(value) || value < 0) {
    return "0:00";
  }

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}


function getCardHeight() {
  return (
    allCards[0]?.getBoundingClientRect().height ||
    container.clientHeight ||
    window.innerHeight
  );
}


/* =====================================
   FIND REPEATED CARDS
===================================== */

function cardsForIndex(index) {
  return allCards.filter(
    card => Number(card.dataset.logicalIndex) === index
  );
}


function canonicalCard(index) {
  return allCards[index];
}


/* =====================================
   STATUS MESSAGE
===================================== */

function setStatus(index, message) {
  cardsForIndex(index).forEach(card => {
    card.querySelector(".player-status").textContent = message;
  });
}


/* =====================================
   VINYL SPEED
===================================== */

function updateVinylSpeed(index, speed) {
  /*
   * Normal speed: one rotation every 10 seconds.
   *
   * 2x speed: one rotation every 5 seconds.
   *
   * 16x speed: one rotation every 0.625 seconds.
   */

  const rotationDuration = 10 / speed;
  document.documentElement.style.setProperty("--eq-duration", `${620 / speed}ms`);

  cardsForIndex(index).forEach(card => {
    const disc = card.querySelector(".album-disc");

    disc.style.animationDuration = `${rotationDuration}s`;
  });
}


function updateSpeedButtons(index, speed) {
  cardsForIndex(index).forEach(card => {
    const button = card.querySelector(".speed-btn");

    button.textContent = `${speed}x`;

    button.classList.toggle("fast", speed !== 1);

    button.setAttribute(
      "aria-label",
      `Playback speed, currently ${speed}x`
    );
  });

  updateVinylSpeed(index, speed);
}


/* =====================================
   CREATE A SHORT CARD
===================================== */

function makeCard(clip, logicalIndex, copyNumber) {
  const card = document.createElement("section");

  card.className = "short-card";

  card.dataset.logicalIndex = String(logicalIndex);
  card.dataset.copyNumber = String(copyNumber);

  card.setAttribute(
    "aria-label",
    `${clip.title}, short ${logicalIndex + 1}`
  );

  const title = escapeHTML(clip.title);
  const description = escapeHTML(clip.description);
  const artwork = escapeHTML(clip.artwork || "2L.png");

  card.innerHTML = `
    <div class="audio-art" aria-hidden="true">
      <div class="disc-shell">

        <img
          class="album-disc"
          src="${artwork}"
          alt=""
        >

        <div class="disc-fallback">
          Tn²
        </div>

      </div>
    </div>

    <div class="short-content">

      <h1 class="audio-title">${title}</h1>

      <p class="audio-desc">${description}</p>

      <div class="audio-controls">

        <button
          class="control-btn play-btn"
          type="button"
          aria-label="Play ${title}"
          aria-pressed="false"
        >
          <span class="material-symbols-rounded" aria-hidden="true">
            play_arrow
          </span>
        </button>

        <div class="seek-control">

          <div class="time-row">
            <span class="current-time">0:00</span>
            <span class="duration-time">0:00</span>
          </div>

          <div class="range-wrapper">

            <div class="range-fill"></div>

            <input
              class="player-seek"
              type="range"
              min="0"
              max="100"
              step="0.1"
              value="0"
              disabled
              aria-label="Seek through ${title}"
            >

          </div>
        </div>

        <button
          class="control-btn speed-btn"
          type="button"
          aria-label="Playback speed, currently 1x"
        >
          1x
        </button>

      </div>

      <p
        class="player-status"
        role="status"
        aria-live="polite"
      ></p>

    </div>
  `;


  /* Artwork fallback handling */

  const image = card.querySelector(".album-disc");
  const shell = card.querySelector(".disc-shell");

  image.dataset.fallbacks = JSON.stringify([
    "../2L.png",
    "/2L.png",
    "8k_3.jpg",
    "../8k_3.jpg",
    "/8k_3.jpg",
    "../Tn 2 Tn.png",
    "/Tn%202%20Tn.png"
  ]);

  image.addEventListener("error", () => {
    let fallbackList;

    try {
      fallbackList = JSON.parse(image.dataset.fallbacks || "[]");
    } catch {
      fallbackList = [];
    }

    if (fallbackList.length > 0) {
      image.src = fallbackList.shift();

      image.dataset.fallbacks = JSON.stringify(fallbackList);
    } else {
      shell.classList.add("art-missing");
    }
  });


  /* Play/pause */

  card.querySelector(".play-btn").addEventListener("click", () => {
    togglePlayback(logicalIndex);
  });


  /* Playback speed */

  card.querySelector(".speed-btn").addEventListener("click", () => {
    cycleSpeed(logicalIndex);
  });


  /* Seek bar */

  card.querySelector(".player-seek").addEventListener("input", event => {
    if (
      logicalIndex !== activeIndex ||
      currentAudioIndex !== logicalIndex ||
      !Number.isFinite(audioPlayer.duration)
    ) {
      return;
    }

    audioPlayer.currentTime = Number(event.target.value);

    updateProgressUI();
  });


  return card;
}


/* =====================================
   BUILD THREE COPIES FOR LOOPING
===================================== */

function renderCards() {
  container.innerHTML = "";
  allCards = [];

  SHORTS.forEach((clip, index) => {
    const card = makeCard(clip, index, 0);
    container.appendChild(card);
    allCards.push(card);
  });
}


/* =====================================
   PLAYING UI
===================================== */

function setPlayingUI(playing) {
  const playingNow = Boolean(
    playing &&
    !audioPlayer.paused &&
    currentAudioIndex === activeIndex
  );

  if (activeIndex >= 0) {
    cardsForIndex(activeIndex).forEach(card => {
      card.classList.toggle("is-playing", playingNow);

      const button = card.querySelector(".play-btn");

      button.innerHTML = `
        <span class="material-symbols-rounded" aria-hidden="true">
          ${playingNow ? "pause" : "play_arrow"}
        </span>
      `;

      button.setAttribute(
        "aria-label",
        `${playingNow ? "Pause" : "Play"} ${SHORTS[activeIndex].title}`
      );

      button.setAttribute(
        "aria-pressed",
        String(playingNow)
      );
    });
  }

  eqLeft.classList.toggle("is-playing", playingNow);
  eqRight.classList.toggle("is-playing", playingNow);
  if (playingNow) startEqualizer();
  else stopEqualizer();
}


/* =====================================
   LIVE AUDIO EQUALIZER
===================================== */

function setupAudioAnalyser() {
  if (audioAnalyser) return true;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return false;

  try {
    audioContext = new AudioContextClass();
    audioAnalyser = audioContext.createAnalyser();
    audioAnalyser.fftSize = 256;
    audioAnalyser.smoothingTimeConstant = 0.72;
    audioSourceNode = audioContext.createMediaElementSource(audioPlayer);
    audioSourceNode.connect(audioAnalyser);
    audioAnalyser.connect(audioContext.destination);
    eqFrequencyData = new Uint8Array(audioAnalyser.frequencyBinCount);
    return true;
  } catch (error) {
    console.warn("Live equalizer unavailable:", error);
    return false;
  }
}

function startEqualizer() {
  if (!audioAnalyser || !eqBars.length) return;
  cancelAnimationFrame(eqAnimationFrame);

  const draw = () => {
    if (audioPlayer.paused || audioPlayer.ended) return;
    audioAnalyser.getByteFrequencyData(eqFrequencyData);
    const bins = eqFrequencyData.length;

    eqBars.forEach((bar, index) => {
      const bin = Math.min(bins - 1, Math.floor(index / eqBars.length * bins));
      const energy = eqFrequencyData[bin] / 255;
      const nextEnergy = eqFrequencyData[Math.min(bins - 1, bin + 1)] / 255;
      const level = Math.max(0.035, Math.pow(energy * 0.72 + nextEnergy * 0.28, 0.82));
      const maxHeight = window.innerWidth <= 420 ? 19 : window.innerWidth <= 900 ? 30 : 76;
      bar.style.height = `${Math.max(3, 3 + level * maxHeight)}px`;
    });

    eqAnimationFrame = requestAnimationFrame(draw);
  };

  eqAnimationFrame = requestAnimationFrame(draw);
}

function stopEqualizer() {
  cancelAnimationFrame(eqAnimationFrame);
  eqAnimationFrame = 0;
  eqBars.forEach(bar => { bar.style.height = ""; });
}


/* =====================================
   SELECT ACTIVE SHORT
===================================== */

function setActiveCard(index) {
  if (index < 0 || index >= SHORTS.length) {
    return;
  }

  if (activeIndex === index && activeCard) {
    return;
  }

  if (activeIndex >= 0) {
    cardsForIndex(activeIndex).forEach(card => {
      card.classList.remove("is-playing");
    });
  }

  if (!audioPlayer.paused) {
    audioPlayer.pause();
  }

  activeIndex = index;
  activeCard = canonicalCard(index);

  currentSpeedIndex = 0;

  audioPlayer.playbackRate = 1;

  updateSpeedButtons(index, 1);

  setStatus(index, "");

  setPlayingUI(false);

  updateProgressUI();
}


/* =====================================
   SEAMLESS LOOPING
===================================== */

function syncActiveCard() {
  if (!allCards.length) return;

  const height = getCardHeight();
  const slot = Math.round(container.scrollTop / height);
  const logicalIndex = Math.max(0, Math.min(SHORTS.length - 1, slot));

  setActiveCard(logicalIndex);
}


function onScroll() {
  syncActiveCard();
}


/* =====================================
   PROGRESS BAR
===================================== */

function updateProgressUI() {
  const duration =
    currentAudioIndex === activeIndex &&
    Number.isFinite(audioPlayer.duration)
      ? audioPlayer.duration
      : 0;

  const current =
    duration > 0
      ? audioPlayer.currentTime
      : 0;

  const percentage =
    duration > 0
      ? current / duration * 100
      : 0;

  cardsForIndex(activeIndex).forEach(card => {
    const range = card.querySelector(".player-seek");

    range.max = duration || 100;
    range.value = current;
    range.disabled = duration <= 0;

    card.querySelector(".current-time").textContent =
      formatTime(current);

    card.querySelector(".duration-time").textContent =
      formatTime(duration);

    card.querySelector(".range-fill").style.width =
      `${percentage}%`;
  });
}


/* =====================================
   PLAY / PAUSE
===================================== */

async function togglePlayback(index) {
  if (index !== activeIndex) {
    setActiveCard(index);
  }

  setStatus(index, "");

  if (
    currentAudioIndex === index &&
    !audioPlayer.paused
  ) {
    audioPlayer.pause();

    setPlayingUI(false);

    return;
  }

  if (currentAudioIndex !== index) {
    currentAudioIndex = index;
    audioPlayer.crossOrigin = "anonymous";
    audioPlayer.src = SHORTS[index].audio;
    audioPlayer.load();

    audioPlayer.playbackRate = SPEEDS[currentSpeedIndex];
  }

  try {
    setupAudioAnalyser();
    if (audioContext && audioContext.state === "suspended") await audioContext.resume();
    await audioPlayer.play();

    setPlayingUI(true);
  } catch (error) {
    setPlayingUI(false);

    setStatus(
      index,
      "Audio could not load. Check the audio URL in script.js."
    );

    console.error("Audio playback failed:", error);
  }
}


/* =====================================
   PLAYBACK SPEED
===================================== */

function cycleSpeed(index) {
  if (index !== activeIndex) {
    setActiveCard(index);
  }

  currentSpeedIndex =
    (currentSpeedIndex + 1) % SPEEDS.length;

  const speed = SPEEDS[currentSpeedIndex];

  if (currentAudioIndex === index) {
    audioPlayer.playbackRate = speed;
  }

  /*
   * Update the vinyl and speed label together.
   */

  updateSpeedButtons(index, speed);
}


/* =====================================
   TODAY'S QUOTE
===================================== */

function openQuote() {
  /*
   * Same selection logic as your original quotes.js:
   * today's date number determines the quote.
   */

  const today = new Date().getDate();

  const todayQuote = quotes[(today - 1) % quotes.length];

  const text = todayQuote.text;
  const highlightedPart = todayQuote.highlight;

  /*
   * Escape the highlight phrase for regular expressions.
   */

  const escapedHighlight = highlightedPart.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );

  const regex = new RegExp(
    `(${escapedHighlight})`,
    "gi"
  );


  /*
   * Highlight the matching phrase safely.
   */

  const formattedQuote = text.replace(regex, match => {
    const safeText = escapeHTML(match);

    return `
      <span
        class="glow-filter"
        data-text="${safeText}"
      >${safeText}</span>
    `;
  });

  dailyQuote.innerHTML = formattedQuote;

  quoteOverlay.hidden = false;

  quoteTrigger.focus();
}


function closeQuote() {
  quoteOverlay.hidden = true;

  quoteTrigger.focus();
}


/* =====================================
   HEADER LOGO FALLBACK
===================================== */

function setupLogoFallback() {
  const logo = document.getElementById("siteLogo");

  if (!logo) {
    return;
  }

  const fallbacks = [
    "Tn 2 Tn.png",
    "/Tn%202%20Tn.png"
  ];

  logo.addEventListener("error", () => {
    if (fallbacks.length > 0) {
      logo.src = fallbacks.shift();
    }
  });
}


/* =====================================
   SCROLLING CONTROLS
===================================== */

function moveByCard(direction) {
  container.scrollBy({
    top: direction * getCardHeight(),
    behavior: "smooth"
  });
}


function setupKeyboardControls() {
  document.addEventListener("keydown", event => {
    if (!quoteOverlay.hidden) {
      if (event.key === "Escape") {
        closeQuote();
      }

      return;
    }

    const target = event.target;

    /*
     * Keep the arrow keys available for operating
     * the seek slider itself.
     */

    if (target.matches("input[type='range']")) {
      return;
    }


    /* Down / Page Down */

    if (
      event.key === "ArrowDown" ||
      event.key === "PageDown"
    ) {
      event.preventDefault();

      moveByCard(1);

      return;
    }


    /* Up / Page Up */

    if (
      event.key === "ArrowUp" ||
      event.key === "PageUp"
    ) {
      event.preventDefault();

      moveByCard(-1);

      return;
    }


    /* Home */

    if (event.key === "Home") {
      event.preventDefault();

      container.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      return;
    }


    /* End */

    if (event.key === "End") {
      event.preventDefault();

      container.scrollTo({
        top: (SHORTS.length - 1) * getCardHeight(),
        behavior: "smooth"
      });

      return;
    }


    /* Spacebar playback */

    if (
      event.code === "Space" &&
      !target.closest("button, a, input, select, textarea")
    ) {
      event.preventDefault();

      if (activeIndex >= 0) {
        togglePlayback(activeIndex);
      }
    }
  });
}


/* =====================================
   INITIALISE
===================================== */

function init() {
  if (!container || !audioPlayer || SHORTS.length === 0) {
    return;
  }

  renderCards();
  eqBars = [...document.querySelectorAll(".eq-bar")];

  setupLogoFallback();

  audioPlayer.loop = false;
  audioPlayer.preload = "metadata";


  /* Audio events */

  audioPlayer.addEventListener("play", () => {
    setPlayingUI(true);
  });

  audioPlayer.addEventListener("pause", () => {
    setPlayingUI(false);
  });

  audioPlayer.addEventListener("timeupdate", updateProgressUI);

  audioPlayer.addEventListener("loadedmetadata", updateProgressUI);

  audioPlayer.addEventListener("durationchange", updateProgressUI);

  audioPlayer.addEventListener("error", () => {
    if (currentAudioIndex === activeIndex && activeIndex >= 0) {
      setStatus(
        activeIndex,
        "Audio failed to load. Check the URL or your connection."
      );

      setPlayingUI(false);
    }
  });


  /* Scrolling */

  container.addEventListener("scroll", onScroll, {
    passive: true
  });


  /* Quote popup */

  quoteTrigger.addEventListener("click", openQuote);

  // Close the quote whenever any part of the overlay is clicked.
  quoteOverlay.addEventListener("click", closeQuote);


  /* Keyboard controls */

  setupKeyboardControls();


  /* Start at the first short; the list ends at the final short. */
  requestAnimationFrame(() => {
    container.scrollTop = 0;
    setActiveCard(0);
  });


  /* Resize and device rotation */

  window.addEventListener("resize", () => {
    requestAnimationFrame(() => {
      const height = getCardHeight();

      const index = Math.max(0, activeIndex);

      container.scrollTop = index * height;
      syncActiveCard();
    });
  });
}


document.addEventListener("DOMContentLoaded", init);
