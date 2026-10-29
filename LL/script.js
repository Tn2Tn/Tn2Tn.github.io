/*
 * Tn² LL / Audio Shorts
 *
 * Edit the SHORTS list to change your audio clips.
 * The supplied audio URLs are demonstration tracks.
 */

const SHORTS = [
  {
    title: "Episode 1",
    description: "Sample audio short — replace this clip with your own.",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    artwork: "8k_3.jpg"
  },
  {
    title: "Episode 2",
    description: "A second demo clip. Edit this text in script.js.",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    artwork: "8k_3.jpg"
  },
  {
    title: "Episode 3",
    description: "A third demo clip. Add more shorts by copying an item in SHORTS.",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    artwork: "8k_3.jpg"
  }
];


/* ---------------------------------
   DAILY QUOTES
--------------------------------- */

const DAILY_QUOTES = [
  "Small steps, repeated consistently, can lead to big changes.",
  "Make what you do today something your future self will thank you for.",
  "A little progress each day adds up to a lot over time.",
  "Listen carefully, speak thoughtfully, and keep learning.",
  "Great things are often built one small decision at a time.",
  "Let your actions make your good intentions real."
];


/* ---------------------------------
   ELEMENTS
--------------------------------- */

const container = document.getElementById("shortsContainer");
const audioPlayer = document.getElementById("audioPlayer");

const eqLeft = document.getElementById("eqLeft");
const eqRight = document.getElementById("eqRight");

const quoteOverlay = document.getElementById("quoteOverlay");
const dailyQuote = document.getElementById("dailyQuote");
const quoteTrigger = document.getElementById("quoteTrigger");
const quoteClose = document.getElementById("quoteClose");


/* ---------------------------------
   PLAYER STATE
--------------------------------- */

const SPEEDS = [1, 1.25, 1.5, 1.75, 2, 16];

let allCards = [];
let activeCard = null;
let activeIndex = 0;
let currentAudioIndex = -1;
let currentSpeedIndex = 0;
let scrollFrame = 0;
let isRepositioning = false;


/* ---------------------------------
   HTML ESCAPING
--------------------------------- */

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}


/* ---------------------------------
   CREATE ONE SHORT CARD
--------------------------------- */

function makeCard(clip, logicalIndex, cloneType = "") {
  const card = document.createElement("section");

  card.className = "short-card";
  card.dataset.logicalIndex = String(logicalIndex);

  if (cloneType) {
    card.dataset.clone = cloneType;
  }

  card.setAttribute(
    "aria-label",
    `${clip.title}, audio short ${logicalIndex + 1} of ${SHORTS.length}`
  );

  const title = escapeHTML(clip.title);
  const description = escapeHTML(clip.description);

  card.innerHTML = `
    <div class="audio-art" aria-hidden="true">
      <div class="disc-shell">
        <img
          class="album-disc"
          alt=""
          src="${escapeHTML(clip.artwork || "8k_3.jpg")}"
        >
        <div class="disc-fallback">Tn²</div>
      </div>
    </div>

    <div class="short-content">

      <div class="episode-kicker">
        Tn² · AUDIO SHORT
      </div>

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
              aria-label="Seek through ${title}"
              disabled
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


  /* Artwork fallbacks */

  const image = card.querySelector(".album-disc");
  const shell = card.querySelector(".disc-shell");

  const candidates = [
    clip.artwork || "8k_3.jpg",
    "../8k_3.jpg",
    "/8k_3.jpg",
    "Tn 2 Tn.png",
    "../Tn 2 Tn.png",
    "/Tn%202%20Tn.png"
  ].filter((value, index, list) => list.indexOf(value) === index);

  image.dataset.fallbacks = JSON.stringify(candidates.slice(1));

  image.addEventListener("error", () => {
    let fallbacks;

    try {
      fallbacks = JSON.parse(image.dataset.fallbacks || "[]");
    } catch {
      fallbacks = [];
    }

    if (fallbacks.length) {
      const next = fallbacks.shift();

      image.dataset.fallbacks = JSON.stringify(fallbacks);
      image.src = next;
    } else {
      shell.classList.add("art-missing");
    }
  });


  /* Play / pause */

  card.querySelector(".play-btn").addEventListener("click", () => {
    togglePlayback(card);
  });


  /* Playback speed */

  card.querySelector(".speed-btn").addEventListener("click", () => {
    cycleSpeed(card);
  });


  /* Seeking */

  const range = card.querySelector(".player-seek");

  range.addEventListener("input", () => {
    if (
      card !== activeCard ||
      currentAudioIndex !== logicalIndex ||
      !Number.isFinite(audioPlayer.duration)
    ) {
      return;
    }

    audioPlayer.currentTime = Number(range.value);

    updateProgressUI();
  });

  return card;
}


/* ---------------------------------
   BUILD THE SHORTS LIST
--------------------------------- */

function renderCards() {
  container.innerHTML = "";

  /*
   * The extra first and last cards create
   * the effect of endless scrolling.
   */

  const lastClone = makeCard(
    SHORTS[SHORTS.length - 1],
    SHORTS.length - 1,
    "last"
  );

  container.appendChild(lastClone);

  SHORTS.forEach((clip, index) => {
    container.appendChild(makeCard(clip, index));
  });

  const firstClone = makeCard(
    SHORTS[0],
    0,
    "first"
  );

  container.appendChild(firstClone);

  allCards = Array.from(
    container.querySelectorAll(".short-card")
  );
}


/* ---------------------------------
   FORMAT PLAYBACK TIME
--------------------------------- */

function formatTime(value) {
  if (!Number.isFinite(value) || value < 0) {
    return "0:00";
  }

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}


/* ---------------------------------
   UPDATE PLAYING APPEARANCE
--------------------------------- */

function setPlayingUI(playing) {
  const isPlayingCurrent = Boolean(
    playing &&
    !audioPlayer.paused &&
    currentAudioIndex === activeIndex
  );

  if (activeCard) {
    activeCard.classList.toggle(
      "is-playing",
      isPlayingCurrent
    );

    const button = activeCard.querySelector(".play-btn");

    if (button) {
      button.innerHTML = `
        <span class="material-symbols-rounded" aria-hidden="true">
          ${isPlayingCurrent ? "pause" : "play_arrow"}
        </span>
      `;

      button.setAttribute(
        "aria-label",
        `${isPlayingCurrent ? "Pause" : "Play"} ${SHORTS[activeIndex].title}`
      );

      button.setAttribute(
        "aria-pressed",
        String(isPlayingCurrent)
      );
    }
  }

  eqLeft.classList.toggle("is-playing", isPlayingCurrent);
  eqRight.classList.toggle("is-playing", isPlayingCurrent);
}


/* ---------------------------------
   SET ACTIVE SHORT
--------------------------------- */

function setActiveCard(card) {
  const nextIndex = Number(card.dataset.logicalIndex);

  if (
    activeCard === card &&
    activeIndex === nextIndex
  ) {
    return;
  }

  if (!audioPlayer.paused) {
    audioPlayer.pause();
  }

  if (activeCard) {
    activeCard.classList.remove("is-playing");

    const oldButton = activeCard.querySelector(".play-btn");

    if (oldButton) {
      oldButton.innerHTML = `
        <span class="material-symbols-rounded" aria-hidden="true">
          play_arrow
        </span>
      `;

      oldButton.setAttribute("aria-pressed", "false");
    }
  }

  activeCard = card;
  activeIndex = nextIndex;

  currentSpeedIndex = 0;
  audioPlayer.playbackRate = 1;

  const speedBtn = activeCard.querySelector(".speed-btn");

  speedBtn.textContent = "1x";
  speedBtn.classList.remove("fast");

  speedBtn.setAttribute(
    "aria-label",
    "Playback speed, currently 1x"
  );

  activeCard.querySelector(".player-status").textContent = "";

  setPlayingUI(false);
  updateProgressUI();
}


/* ---------------------------------
   SCROLL POSITION
--------------------------------- */

function getSlotFromScroll() {
  const height = container.clientHeight || window.innerHeight;

  return Math.round(container.scrollTop / height);
}


/* ---------------------------------
   INFINITE SCROLL
--------------------------------- */

function syncActiveCard() {
  scrollFrame = 0;

  if (isRepositioning || !allCards.length) {
    return;
  }

  const height = container.clientHeight || window.innerHeight;

  let slot = getSlotFromScroll();

  const lastSlot = SHORTS.length + 1;


  /* Scrolled past the last real card */

  if (slot <= 0) {
    isRepositioning = true;

    container.style.scrollSnapType = "none";

    container.scrollTop = SHORTS.length * height;

    slot = SHORTS.length;

    requestAnimationFrame(() => {
      container.style.scrollSnapType = "y mandatory";
      isRepositioning = false;
    });
  }


  /* Scrolled past the first real card */

  else if (slot >= lastSlot) {
    isRepositioning = true;

    container.style.scrollSnapType = "none";

    container.scrollTop = height;

    slot = 1;

    requestAnimationFrame(() => {
      container.style.scrollSnapType = "y mandatory";
      isRepositioning = false;
    });
  }


  const card = allCards[
    Math.min(
      Math.max(slot, 1),
      SHORTS.length
    )
  ];

  if (card) {
    setActiveCard(card);
  }
}


function onScroll() {
  if (!scrollFrame) {
    scrollFrame = requestAnimationFrame(syncActiveCard);
  }
}


/* ---------------------------------
   UPDATE AUDIO PROGRESS
--------------------------------- */

function updateProgressUI() {
  const isCurrentAudioActive =
    currentAudioIndex === activeIndex &&
    Number.isFinite(audioPlayer.duration) &&
    audioPlayer.duration > 0;

  const duration = isCurrentAudioActive
    ? audioPlayer.duration
    : 0;

  const current = isCurrentAudioActive
    ? audioPlayer.currentTime
    : 0;

  const percent = duration > 0
    ? (current / duration) * 100
    : 0;


  allCards.forEach(card => {
    if (Number(card.dataset.logicalIndex) !== activeIndex) {
      return;
    }

    const range = card.querySelector(".player-seek");

    range.max = duration || 100;
    range.value = duration ? current : 0;
    range.disabled = !duration;

    card.querySelector(".current-time").textContent =
      formatTime(current);

    card.querySelector(".duration-time").textContent =
      formatTime(duration);

    card.querySelector(".range-fill").style.width =
      `${percent}%`;
  });
}


/* ---------------------------------
   PLAY / PAUSE AUDIO
--------------------------------- */

async function togglePlayback(card) {
  if (card !== activeCard) {
    setActiveCard(card);
  }

  const index = Number(card.dataset.logicalIndex);

  const status = card.querySelector(".player-status");

  status.textContent = "";


  /* Pause current clip */

  if (
    currentAudioIndex === index &&
    !audioPlayer.paused
  ) {
    audioPlayer.pause();

    setPlayingUI(false);

    return;
  }


  /* Load a new clip */

  if (currentAudioIndex !== index) {
    currentAudioIndex = index;

    audioPlayer.src = SHORTS[index].audio;
    audioPlayer.currentTime = 0;

    currentSpeedIndex = 0;
    audioPlayer.playbackRate = 1;

    const speedBtn = activeCard.querySelector(".speed-btn");

    speedBtn.textContent = "1x";
    speedBtn.classList.remove("fast");

    speedBtn.setAttribute(
      "aria-label",
      "Playback speed, currently 1x"
    );

    updateProgressUI();
  }


  /* Start playback */

  try {
    await audioPlayer.play();

    setPlayingUI(true);
  } catch (error) {
    setPlayingUI(false);

    status.textContent =
      "This audio could not be loaded. Check the clip URL in script.js.";

    console.error("Audio playback failed:", error);
  }
}


/* ---------------------------------
   PLAYBACK SPEED
--------------------------------- */

function cycleSpeed(card) {
  if (card !== activeCard) {
    setActiveCard(card);
  }

  currentSpeedIndex =
    (currentSpeedIndex + 1) % SPEEDS.length;

  const speed = SPEEDS[currentSpeedIndex];

  if (currentAudioIndex === activeIndex) {
    audioPlayer.playbackRate = speed;
  }

  const button = card.querySelector(".speed-btn");

  button.textContent = `${speed}x`;

  button.classList.toggle(
    "fast",
    speed !== 1
  );

  button.setAttribute(
    "aria-label",
    `Playback speed, currently ${speed}x`
  );
}


/* ---------------------------------
   DAILY QUOTE POPUP
--------------------------------- */

function openQuote() {
  const now = new Date();

  const dayNumber = Math.floor(
    new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).getTime() / 86400000
  );

  const quoteIndex =
    ((dayNumber % DAILY_QUOTES.length) + DAILY_QUOTES.length)
    % DAILY_QUOTES.length;

  dailyQuote.textContent = DAILY_QUOTES[quoteIndex];

  quoteOverlay.hidden = false;

  quoteClose.focus();
}


function closeQuote() {
  quoteOverlay.hidden = true;

  quoteTrigger.focus();
}


/* ---------------------------------
   LOGO FALLBACKS
--------------------------------- */

function setLogoFallback() {
  const logo = document.getElementById("siteLogo");

  const candidates = [
    "../Tn 2 Tn.png",
    "/Tn%202%20Tn.png"
  ];

  logo.addEventListener("error", () => {
    const next = candidates.shift();

    if (next) {
      logo.src = next;
    } else {
      logo.style.visibility = "hidden";
    }
  });
}


/* ---------------------------------
   KEYBOARD CONTROLS
--------------------------------- */

function setupKeyboardShortcuts() {
  document.addEventListener("keydown", event => {

    /* Close quote with Escape */

    if (!quoteOverlay.hidden) {
      if (event.key === "Escape") {
        closeQuote();
      }

      return;
    }

    const tagName =
      event.target && event.target.tagName;

    const isTypingOrControl = [
      "INPUT",
      "TEXTAREA",
      "BUTTON",
      "A"
    ].includes(tagName);

    if (isTypingOrControl) {
      return;
    }


    /* Up and down arrows */

    if (
      event.code === "ArrowDown" ||
      event.code === "ArrowUp"
    ) {
      event.preventDefault();

      container.scrollBy({
        top:
          (event.code === "ArrowDown" ? 1 : -1) *
          container.clientHeight,
        behavior: "smooth"
      });
    }


    /* Spacebar toggles audio */

    else if (event.code === "Space") {
      event.preventDefault();

      if (activeCard) {
        togglePlayback(activeCard);
      }
    }
  });
}


/* ---------------------------------
   INITIALISE EVERYTHING
--------------------------------- */

function init() {
  if (!SHORTS.length) {
    return;
  }

  renderCards();

  setLogoFallback();


  /* One shared audio player */

  audioPlayer.loop = true;
  audioPlayer.preload = "metadata";


  /* Playback events */

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
    if (
      activeCard &&
      currentAudioIndex === activeIndex
    ) {
      activeCard.querySelector(".player-status").textContent =
        "Audio failed to load. Check the URL or your connection.";

      setPlayingUI(false);
    }
  });


  /* Scroll and quote events */

  container.addEventListener("scroll", onScroll, {
    passive: true
  });

  quoteTrigger.addEventListener("click", openQuote);

  quoteClose.addEventListener("click", closeQuote);

  quoteOverlay.addEventListener("click", event => {
    if (event.target === quoteOverlay) {
      closeQuote();
    }
  });


  /* Keyboard support */

  setupKeyboardShortcuts();


  /* Start on the first real short */

  requestAnimationFrame(() => {
    container.scrollTop =
      container.clientHeight || window.innerHeight;

    syncActiveCard();
  });


  /* Keep the current card correctly positioned after resizing */

  window.addEventListener("resize", () => {
    const slot = Math.min(
      Math.max(getSlotFromScroll(), 1),
      SHORTS.length
    );

    container.scrollTop =
      slot * (container.clientHeight || window.innerHeight);

    requestAnimationFrame(syncActiveCard);
  });
}


document.addEventListener("DOMContentLoaded", init);






