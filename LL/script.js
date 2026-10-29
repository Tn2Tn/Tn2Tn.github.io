/*
 * Tn² LL — Audio Shorts
 *
 * Features:
 * - Seamless looping scroll
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
    text: "Be Fearless.",
    highlight: "Fearless."
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
const quoteClose = document.getElementById("quoteClose");


/* =====================================
   PLAYER STATE
===================================== */

const SPEEDS = [1, 1.25, 1.5, 1.75, 2, 16];

let allCards = [];

let activeCard = null;
let activeIndex = -1;
let currentAudioIndex = -1;

let currentSpeedIndex = 0;

let scrollFrame = 0;
let isRepositioning = false;


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
  return allCards[SHORTS.length + index];
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

  /*
   * The three copies let the user scroll infinitely.
   * The viewport starts on the middle copy.
   */

  for (let copy = 0; copy < 3; copy++) {
    SHORTS.forEach((clip, index) => {
      const card = makeCard(clip, index, copy);

      container.appendChild(card);
      allCards.push(card);
    });
  }
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
  scrollFrame = 0;

  if (!allCards.length || isRepositioning) {
    return;
  }

  const count = SHORTS.length;
  const height = getCardHeight();
  const sequenceHeight = count * height;

  let top = container.scrollTop;

  /*
   * At the beginning of the first copy, jump
   * forward by one full sequence.
   *
   * The cards are identical, so this is invisible.
   */

  if (top < sequenceHeight) {
    isRepositioning = true;

    container.style.scrollSnapType = "none";

    container.scrollTop = top + sequenceHeight;

    requestAnimationFrame(() => {
      container.style.scrollSnapType = "y mandatory";

      isRepositioning = false;

      syncActiveCard();
    });

    return;
  }


  /*
   * At the beginning of the third copy, jump
   * backward by one full sequence.
   */

  if (top >= sequenceHeight * 2) {
    isRepositioning = true;

    container.style.scrollSnapType = "none";

    container.scrollTop = top - sequenceHeight;

    requestAnimationFrame(() => {
      container.style.scrollSnapType = "y mandatory";

      isRepositioning = false;

      syncActiveCard();
    });

    return;
  }


  /*
   * Identify the visible short, including
   * changes caused by swipes or fast scrolling.
   */

  const slot = Math.round(top / height);

  const logicalIndex =
    ((slot % count) + count) % count;

  setActiveCard(logicalIndex);
}


function onScroll() {
  if (!scrollFrame) {
    scrollFrame = requestAnimationFrame(syncActiveCard);
  }
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

    audioPlayer.src = SHORTS[index].audio;
    audioPlayer.load();

    audioPlayer.playbackRate = SPEEDS[currentSpeedIndex];
  }

  try {
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
  dailyQuote.dataset.text = text;

  quoteOverlay.hidden = false;

  quoteClose.focus();
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
        top: SHORTS.length * getCardHeight(),
        behavior: "smooth"
      });

      return;
    }


    /* End */

    if (event.key === "End") {
      event.preventDefault();

      container.scrollTo({
        top: (2 * SHORTS.length - 1) * getCardHeight(),
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

  setupLogoFallback();

  audioPlayer.loop = true;
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

  quoteClose.addEventListener("click", closeQuote);

  quoteOverlay.addEventListener("click", event => {
    if (event.target === quoteOverlay) {
      closeQuote();
    }
  });


  /* Keyboard controls */

  setupKeyboardControls();


  /*
   * Start at the first short in the middle copy,
   * leaving room to loop in both directions.
   */

  requestAnimationFrame(() => {
    container.scrollTop = SHORTS.length * getCardHeight();

    setActiveCard(0);
  });


  /* Resize and device rotation */

  window.addEventListener("resize", () => {
    requestAnimationFrame(() => {
      const height = getCardHeight();

      const index = Math.max(0, activeIndex);

      container.style.scrollSnapType = "none";

      container.scrollTop =
        (SHORTS.length + index) * height;

      requestAnimationFrame(() => {
        container.style.scrollSnapType = "y mandatory";

        syncActiveCard();
      });
    });
  });
}


document.addEventListener("DOMContentLoaded", init);
