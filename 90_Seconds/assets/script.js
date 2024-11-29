"use strict";

/**
 * all podcast information
 */

const audioData = [
 /** empty data entry
  {
    posterUrl: "",
    title: "",
    episode: "",
    audioPath: "",
  },
  */
      {
    "posterUrl": "assets/images/Parshas Toldos.png",
    "title": "90 seconds to תורה",
    "episode": "Parshas Toldos",
    "audioPath": "assets/audio/P Toldos.mp3"
  },
     {
    "posterUrl": "assets/images/Parshas Chayei Sara.png",
    "title": "90 seconds to תורה",
    "episode": "Parshas Chayei Sara",
    "audioPath": "assets/audio/P Chayei Sara.mp3"
  },
    {
    "posterUrl": "assets/images/Parshas Lech Lecha.png",
    "title": "90 seconds to תורה",
    "episode": "Parshas Lech Lecha",
    "audioPath": "assets/audio/P Lech Lecha.mp3"
  },
];

/**
 * add event Listnere on all elements that are passed
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

/**
 * PLAYLIST
 *
 * add all podcast in playlist, from 'audioData'
 */

const playlist = document.querySelector("[data-podcast-list]");

for (let i = 0, len = audioData.length; i < len; i++) {
  playlist.innerHTML += `
  <li>
    <button class="podcast-item ${i === 0 ? "playing" : ""}" data-playlist-toggler data-playlist-item="${i}">
      <img src="${audioData[i].posterUrl}" width="800" height="800" alt="${audioData[i].title} Album Poster"
        class="img-cover lazyload">

      <div class="item-icon">
        <span class="material-symbols-rounded">equalizer</span>
      </div>
    </button>
  </li>
  `;
}

/**
 * PLAYLIST MODAL SIDEBAR TOGGLE
 *
 * show 'playlist' modal sidebar when click on playlist button in top app bar
 * and hide when click on overlay or any playlist-item
 */

const playlistSideModal = document.querySelector("[data-playlist]");
const playlistTogglers = document.querySelectorAll("[data-playlist-toggler]");
const overlay = document.querySelector("[data-overlay]");

const togglePlaylist = function () {
  playlistSideModal.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("modalActive");
};

addEventOnElements(playlistTogglers, "click", togglePlaylist);

/**
 * PLAYLIST ITEM
 *
 * remove active state from last time played podcast
 * and add active state in clicked podcast
 */

const playlistItems = document.querySelectorAll("[data-playlist-item]");

let currentMusic = 0;
let lastPlayedMusic = 0;

const changePlaylistItem = function () {
  playlistItems[lastPlayedMusic].classList.remove("playing");
  playlistItems[currentMusic].classList.add("playing");
};

addEventOnElements(playlistItems, "click", function () {
  lastPlayedMusic = currentMusic;
  currentMusic = Number(this.dataset.playlistItem);
  changePlaylistItem();
});



/**
 * PLAYER
 *
 * change all visual information on player, based on current podcast
 */

const playerBanner = document.querySelector("[data-player-banner]");
const playerTitle = document.querySelector("[data-title]");
const playerYear = document.querySelector("[data-episode]");

const audioSource = new Audio(audioData[currentMusic].audioPath);

const changePlayerInfo = function () {
  playerTitle.textContent = audioData[currentMusic].title;
  playerYear.textContent = audioData[currentMusic].episode;

  audioSource.src = audioData[currentMusic].audioPath;

  audioSource.addEventListener("loadeddata", updateDuration);
  playMusic();
};

addEventOnElements(playlistItems, "click", changePlayerInfo);

// Set player info on load
const setPlayerInfo = function () {
  playerTitle.textContent = audioData[currentMusic].title;
  playerYear.textContent = audioData[currentMusic].episode;

  audioSource.src = audioData[currentMusic].audioPath;;
};
setPlayerInfo();

/** update player duration */
const playerDuration = document.querySelector("[data-duration]");
const playerSeekRange = document.querySelector("[data-seek]");

/** pass seconds and get timcode formate */
const getTimecode = function (duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.ceil(duration - minutes * 60);
  const timecode = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  return timecode;
};

const updateDuration = function () {
  playerSeekRange.max = Math.ceil(audioSource.duration);
  playerDuration.textContent = getTimecode(Number(playerSeekRange.max));
};

audioSource.addEventListener("loadeddata", updateDuration);

/**
 * PLAY MUSIC
 *
 * play and pause podcast when click on play button
 */

const playBtn = document.querySelector("[data-play-btn]");

let playInterval;

const playMusic = function () {
  if (audioSource.paused) {
    audioSource.play();
    playBtn.classList.add("active");
    playInterval = setInterval(updateRunningTime, 500);
  } else {
    audioSource.pause();
    playBtn.classList.remove("active");
    clearInterval(playInterval);
  }
};

document.addEventListener("keydown", function(event) {
  // Check if the pressed key is the spacebar
  if (event.keyCode === 32) {
    // Prevent default behavior of scrolling the page
    event.preventDefault();
    // Toggle play/pause of the audio
    playMusic();
  }
});

playBtn.addEventListener("click", playMusic);


/** update running time while playing podcast */

const playerRunningTime = document.querySelector("[data-running-time");

/** Countdown Logic */

const updateRunningTime = function () {
  // Update the player seek range to match the current time of the audio
  playerSeekRange.value = audioSource.currentTime;
  playerRunningTime.textContent = getTimecode(audioSource.currentTime);

  // Calculate the remaining countdown by subtracting the current time from 90 seconds
  countdown = 90 - Math.ceil(audioSource.currentTime);

  // Display countdown in the designated HTML element
  document.querySelector("[data-countdown]").textContent = countdown;

  // Update the range fill and check if the music has ended
  updateRangeFill();
  isMusicEnd();
};

// Ensure you have an element in your HTML to display the countdown
// <div data-countdown>90</div>



// Ensure you have an element in your HTML to display the countdown
// <div data-countdown>90:00</div>


/**
 * RANGE FILL WIDTH
 *
 * change 'rangeFill' width, while changing range value
 */

const ranges = document.querySelectorAll("[data-range]");
const rangeFill = document.querySelector("[data-range-fill]");

const updateRangeFill = function () {
  let element = this || ranges[0];

  const rangeValue = (element.value / element.max) * 100;
  element.nextElementSibling.style.width = `${rangeValue}%`;
};

addEventOnElements(ranges, "input", updateRangeFill);

/**
 * SEEK MUSIC
 *
 * seek podcast while changing player seek range
 */

let countdown = 90; // Initialize countdown to 90 seconds

// Update running time and countdown when seeking
const seek = function () {
  // Set the audio current time to the seek range's value
  audioSource.currentTime = playerSeekRange.value;
  
  // Update the running time display
  playerRunningTime.textContent = getTimecode(playerSeekRange.value);

  // Update countdown based on the new current time
  countdown = 90 - Math.ceil(audioSource.currentTime);
  
  // Display the updated countdown
  document.querySelector("[data-countdown]").textContent = countdown;

  // Update the range fill width to match the new position
  updateRangeFill();
};


playerSeekRange.addEventListener("input", seek);

/**
 * END MUSIC
 */

const isMusicEnd = function () {
  if (audioSource.ended) {
    playBtn.classList.remove("active");
    playerSeekRange.value = audioSource.currentTime;
    playerRunningTime.textContent = getTimecode(audioSource.currentTime);
    updateRangeFill();
  }
};

/**
 * SKIP TO NEXT MUSIC
 */

const playerSkipNextBtn = document.querySelector("[data-skip-next]");

const skipNext = function () {
  lastPlayedMusic = currentMusic;

  if (isShuffled) {
    shuffleMusic();
  } else {
    currentMusic >= audioData.length - 1 ? (currentMusic = 0) : currentMusic++;
  }

  changePlayerInfo();
  changePlaylistItem();
};

playerSkipNextBtn.addEventListener("click", skipNext);

/**
 * SKIP TO PREVIOUS MUSIC
 */

const playerSkipPrevBtn = document.querySelector("[data-skip-prev]");

const skipPrev = function () {
  lastPlayedMusic = currentMusic;

  if (isShuffled) {
    shuffleMusic();
  } else {
    currentMusic <= 0 ? (currentMusic = audioData.length - 1) : currentMusic--;
  }

  changePlayerInfo();
  changePlaylistItem();
};

playerSkipPrevBtn.addEventListener("click", skipPrev);

/**
 * SHUFFLE MUSIC
 */

/** get random number for shuffle */
// const getRandomMusic = () => Math.floor(Math.random() * audioData.length);

// const shuffleMusic = () => (currentMusic = getRandomMusic());

const playerShuffleBtn = document.querySelector("[data-shuffle]");
let isShuffled = false;

// const shuffle = function () {
//   playerShuffleBtn.classList.toggle("active");

//   isShuffled = isShuffled ? false : true;
// };

// playerShuffleBtn.addEventListener("click", shuffle);

/**
 * REPEAT MUSIC
 */

// const playerRepeatBtn = document.querySelector("[data-repeat]");

// const repeat = function () {
//   if (!audioSource.loop) {
//     audioSource.loop = true;
//     this.classList.add("active");
//   } else {
//     audioSource.loop = false;
//     this.classList.remove("active");
//   }
// };

// playerRepeatBtn.addEventListener("click", repeat);

/**
 * MUSIC VOLUME
 *
 * increase or decrease podcast volume when change the volume range
 */

const playerVolumeRange = document.querySelector("[data-volume]");
const playerVolumeBtn = document.querySelector("[data-volume-btn]");

const changeVolume = function () {
  audioSource.volume = playerVolumeRange.value;
  audioSource.muted = false;

  if (audioSource.volume <= 0.1) {
    playerVolumeBtn.children[0].textContent = "volume_mute";
  } else if (audioSource.volume <= 0.5) {
    playerVolumeBtn.children[0].textContent = "volume_down";
  } else {
    playerVolumeBtn.children[0].textContent = "volume_up";
  }
};

playerVolumeRange.addEventListener("input", changeVolume);

/**
 * MUTE MUSIC
 */

const muteVolume = function () {
  if (!audioSource.muted) {
    audioSource.muted = true;
    playerVolumeBtn.children[0].textContent = "volume_off";
  } else {
    changeVolume();
  }
};

playerVolumeBtn.addEventListener("click", muteVolume);

/**
 * Music Speed
 */ 

const speedInput = document.getElementById('speed-input');
const speeds = [1, 1.25, 1.5, 1.75, 2];
let currentSpeedIndex = 0;

speedInput.addEventListener('click', function() {
  currentSpeedIndex = (currentSpeedIndex + 1) % speeds.length;
  const selectedSpeed = speeds[currentSpeedIndex];
  audioSource.playbackRate = selectedSpeed;
  this.textContent = selectedSpeed + 'x';
  
  // Change color based on selected speed
  if (selectedSpeed === 1) {
    this.style.color = 'var(--on-surface-variant)';
  } else {
    this.style.color = 'var(--primary)';
  }
});

// Get the download button element
const downloadBtn = document.getElementById("download-btn");

// Add event listener for the download button
downloadBtn.addEventListener("click", function() {
  // Get the current podcast's audio file URL
  const currentPodcast = audioData[currentMusic];
  const podcastUrl = currentPodcast.audioPath;
  
  // Create a temporary anchor element to trigger the download
  const anchor = document.createElement("a");
  anchor.href = podcastUrl;
  anchor.download = `90 seconds to תורה - ${currentPodcast.episode}.mp3`; // Set the filename for download
  anchor.click();

  // Remove the anchor element from the DOM
  anchor.remove();
});
