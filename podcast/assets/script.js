"use strict";

/**
 * all podcast information
 */

const podcastData = [
  /** empty data entry
  {
    posterUrl: "",
    title: "",
    guest: "",
    episode: "",
    summary: "",
    podcastPath: "",
  },
  */
   {
     "posterUrl": "assets/images/episode01.png",
     "title": "Baal Musar",
     "guest": "Eliezer Kahn",
     "episode": "1",
     "summary": "Listen to Eliezer give life musar to all listeners under 90 years young and list 16/21 nicknames  Thank you to MGS for make this episode come out late",
     "podcastPath": "assets/audio/Eliezer Podcast.mp3"
   },
 ];

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
 * add all podcast in playlist, from 'podcastData'
 */

const playlist = document.querySelector("[data-podcast-list]");

for (let i = 0, len = podcastData.length; i < len; i++) {
  playlist.innerHTML += `
  <li>
    <button class="podcast-item ${i === 0 ? "playing" : ""}" data-playlist-toggler data-playlist-item="${i}">
      <img src="${podcastData[i].posterUrl}" width="800" height="800" alt="${podcastData[i].title} Album Poster"
        class="img-cover">

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
const playerAlbum = document.querySelector("[data-guest]");
const playerYear = document.querySelector("[data-episode]");
const playerArtist = document.querySelector("[data-summary]");

const audioSource = new Audio(podcastData[currentMusic].podcastPath);

const changePlayerInfo = function () {
  playerBanner.src = podcastData[currentMusic].posterUrl;
  playerBanner.setAttribute("alt", `${podcastData[currentMusic].title} Album Poster`);
  document.body.style.backgroundImage = `url(${podcastData[currentMusic].posterUrl})`;
  playerTitle.textContent = podcastData[currentMusic].title;
  playerAlbum.textContent = podcastData[currentMusic].guest;
  playerYear.textContent = "Episode: " + podcastData[currentMusic].episode;
  playerArtist.textContent = podcastData[currentMusic].summary;

  audioSource.src = podcastData[currentMusic].podcastPath;

  audioSource.addEventListener("loadeddata", updateDuration);
  playMusic();
  setBackground();
};

addEventOnElements(playlistItems, "click", changePlayerInfo);

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

playBtn.addEventListener("click", playMusic);

/** update running time while playing podcast */

const playerRunningTime = document.querySelector("[data-running-time");

const updateRunningTime = function () {
  playerSeekRange.value = audioSource.currentTime;
  playerRunningTime.textContent = getTimecode(audioSource.currentTime);

  updateRangeFill();
  isMusicEnd();
};

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

const seek = function () {
  audioSource.currentTime = playerSeekRange.value;
  playerRunningTime.textContent = getTimecode(playerSeekRange.value);
};

playerSeekRange.addEventListener("input", seek);

/**
 * END MUSIC
 */

const isMusicEnd = function () {
  if (audioSource.ended) {
    playBtn.classList.remove("active");
    audioSource.currentTime = 0;
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
    currentMusic >= podcastData.length - 1 ? (currentMusic = 0) : currentMusic++;
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
    currentMusic <= 0 ? (currentMusic = podcastData.length - 1) : currentMusic--;
  }

  changePlayerInfo();
  changePlaylistItem();
};

playerSkipPrevBtn.addEventListener("click", skipPrev);

/**
 * SHUFFLE MUSIC
 */

/** get random number for shuffle */
// const getRandomMusic = () => Math.floor(Math.random() * podcastData.length);

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
