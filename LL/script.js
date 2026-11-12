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
let eqBars = [];
let playRequestId = 0;



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

function randomizeEqBars() {
  eqBars.forEach(bar => {
    // Give every bar its own rhythm, phase, and peak length.
    const randomSpeed = 0.65 + Math.random() * 1.15;
    const randomDelay = -Math.random() * 1.8;
    const randomMax = 18 + Math.random() * 58;

    bar.style.setProperty("--eq-random-speed", randomSpeed.toFixed(2));
    bar.style.setProperty("--eq-bar-max", `${randomMax.toFixed(0)}px`);
    bar.style.animationDelay = `${randomDelay.toFixed(2)}s`;
  });
}


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
    disc.style.setProperty("--vinyl-duration", `${rotationDuration}s`);
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

  if (currentAudioIndex === index && !audioPlayer.paused) {
    audioPlayer.pause();
    setPlayingUI(false);
    return;
  }

  const requestId = ++playRequestId;
  const needsReload =
    currentAudioIndex !== index ||
    Boolean(audioPlayer.error) ||
    audioPlayer.networkState === HTMLMediaElement.NETWORK_NO_SOURCE;

  setStatus(index, "Loading audio…");

  if (needsReload) {
    currentAudioIndex = index;
    audioPlayer.pause();
    audioPlayer.removeAttribute("src");
    audioPlayer.load();
    audioPlayer.src = SHORTS[index].audio;
    audioPlayer.load();
  }

  audioPlayer.loop = true;
  audioPlayer.playbackRate = SPEEDS[currentSpeedIndex];

  try {
    // Do not route the media through Web Audio: cross-origin audio hosts
    // can block that path and leave the player silent.
    await audioPlayer.play();

    if (requestId !== playRequestId || index !== activeIndex) {
      audioPlayer.pause();
      return;
    }

    setStatus(index, "");
    setPlayingUI(true);
  } catch (error) {
    if (requestId !== playRequestId) return;

    setPlayingUI(false);
    const message = error && error.name === "NotAllowedError"
      ? "Your browser blocked playback. Press Play again."
      : "Audio didn't load. Check your connection or try Play again.";
    setStatus(index, message);
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
  randomizeEqBars();

  setupLogoFallback();

  audioPlayer.preload = "metadata";
  audioPlayer.loop = true;
  audioPlayer.loop = true;


  /* Audio events */

  audioPlayer.addEventListener("play", () => {
    if (activeIndex >= 0) setStatus(activeIndex, "");
    setPlayingUI(true);
  });

  audioPlayer.addEventListener("pause", () => {
    setPlayingUI(false);
  });

  audioPlayer.addEventListener("waiting", () => {
    if (currentAudioIndex === activeIndex && activeIndex >= 0) {
      setStatus(activeIndex, "Buffering audio…");
    }
  });

  audioPlayer.addEventListener("playing", () => {
    if (currentAudioIndex === activeIndex && activeIndex >= 0) {
      setStatus(activeIndex, "");
    }
  });

  audioPlayer.addEventListener("timeupdate", updateProgressUI);
  audioPlayer.addEventListener("loadedmetadata", updateProgressUI);
  audioPlayer.addEventListener("durationchange", updateProgressUI);

  audioPlayer.addEventListener("error", () => {
    if (currentAudioIndex === activeIndex && activeIndex >= 0) {
      const code = audioPlayer.error?.code;
      const message = code === 4
        ? "This audio file or format is unavailable."
        : "Audio couldn't load. Check your connection, then press Play to retry.";
      setStatus(activeIndex, message);
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
