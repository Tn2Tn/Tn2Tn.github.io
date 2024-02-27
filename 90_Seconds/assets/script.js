"use strict";

//comming soon start
// Remove background image from the body
document.body.style.backgroundImage = "none";

// Create a div element for the "Coming Soon" banner
var comingSoonDiv = document.createElement("div");
comingSoonDiv.innerHTML = "<h1 style='color: red;'>Coming Soon</h1>"; // Set color to red
comingSoonDiv.style.cssText = "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: #fff; padding: 20px; border: 1px solid #ccc; text-align: center; z-index: 9999;"; // Added text-align: center;

// Create a button to go home
var goHomeButton = document.createElement("button");
goHomeButton.style.cssText = "padding: 10px 20px; background-color: #007bff; color: #fff; border: none; cursor: pointer; display: flex; align-items: center;";

// Create a home icon inside the button
var homeIcon = document.createElement("img");
homeIcon.src = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='20' height='20'%3E%3Cpath d='M12 3L2 12h3v8h6v-6h4v6h6v-8h3L12 3zm8 7h-4V5.83l-7 7-7-7V10H4v10h4v-6h6v6h4V10h4v4z'/%3E%3C/svg%3E";
homeIcon.style.cssText = "width: 20px; height: 20px; margin-right: 5px;";

// Add the home icon to the button
goHomeButton.appendChild(homeIcon);

// Add the "Go Home" text to the button
var goHomeText = document.createTextNode("Go Home");
goHomeButton.appendChild(goHomeText);

// Add event listener to the button to navigate to the home page
goHomeButton.addEventListener("click", function() {
    window.location.href = "../"; // Redirect to the parent directory
});

// Append the button to the "Coming Soon" div
comingSoonDiv.appendChild(goHomeButton);

// Replace all content of the body with the "Coming Soon" banner
document.body.innerHTML = "";
document.body.appendChild(comingSoonDiv);

//comming soon end 

/**
 * all podcast information
 */

const videoData = [
  /** empty data entry
  {
    posterUrl: "",
    title: "",
    episode: "",
    summary: "",
    videoPath: "",
  },
  */
    {
     "posterUrl": "assets/images/episode01.png",
     "title": "Sound waves",
     "episode": "1",
     "summary": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
     "videoPath": "assets/Videos/file_example_MP4_480_1_5MG.mp4"
   },
   {
     "posterUrl": "assets/images/episode02.png",
     "title": "video file",
     "episode": "2",
     "summary": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
     "videoPath": "assets/Videos/file_example_MP4_480_1_5MG.mp4"
   }
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
 * add all podcast in playlist, from 'videoData'
 */

const playlist = document.querySelector("[data-podcast-list]");

for (let i = 0, len = videoData.length; i < len; i++) {
  playlist.innerHTML += `
  <li>
    <button class="podcast-item ${i === 0 ? "playing" : ""}" data-playlist-toggler data-playlist-item="${i}">
      <img src="${videoData[i].posterUrl}" width="800" height="800" alt="${videoData[i].title} Album Poster"
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
const playerYear = document.querySelector("[data-episode]");
const playerArtist = document.querySelector("[data-summary]");

const audioSource = new Audio(videoData[currentMusic].videoPath);

const changePlayerInfo = function () {
  playerBanner.src = videoData[currentMusic].videoPath;
  playerBanner.setAttribute("alt", `${videoData[currentMusic].title} Album Poster`);
  document.body.style.backgroundImage = `url(${videoData[currentMusic].posterUrl})`;
  playerTitle.textContent = videoData[currentMusic].title;
  playerYear.textContent = "Episode: " + videoData[currentMusic].episode;
  playerArtist.textContent = videoData[currentMusic].summary;

  audioSource.src = videoData[currentMusic].videoPath;

  // audioSource.addEventListener("loadeddata", updateDuration);
  // playMusic();
};

addEventOnElements(playlistItems, "click", changePlayerInfo);

/** update player duration */
// const playerDuration = document.querySelector("[data-duration]");
// const playerSeekRange = document.querySelector("[data-seek]");

/** pass seconds and get timcode formate */
// const getTimecode = function (duration) {
//   const minutes = Math.floor(duration / 60);
//   const seconds = Math.ceil(duration - minutes * 60);
//   const timecode = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//   return timecode;
// };

// const updateDuration = function () {
//   playerSeekRange.max = Math.ceil(audioSource.duration);
//   playerDuration.textContent = getTimecode(Number(playerSeekRange.max));
// };

// audioSource.addEventListener("loadeddata", updateDuration);

/**
 * PLAY MUSIC
 *
 * play and pause podcast when click on play button
 */

// const playBtn = document.querySelector("[data-play-btn]");

// let playInterval;

// const playMusic = function () {
//   if (audioSource.paused) {
//     audioSource.play();
//     playBtn.classList.add("active");
//     playInterval = setInterval(updateRunningTime, 500);
//   } else {
//     audioSource.pause();
//     playBtn.classList.remove("active");
//     clearInterval(playInterval);
//   }
// };

// playBtn.addEventListener("click", playMusic);

// /** update running time while playing podcast */

// const playerRunningTime = document.querySelector("[data-running-time");

// const updateRunningTime = function () {
//   playerSeekRange.value = audioSource.currentTime;
//   playerRunningTime.textContent = getTimecode(audioSource.currentTime);

//   updateRangeFill();
//   isMusicEnd();
// };

/**
 * RANGE FILL WIDTH
 *
 * change 'rangeFill' width, while changing range value
 */

// const ranges = document.querySelectorAll("[data-range]");
// const rangeFill = document.querySelector("[data-range-fill]");

// const updateRangeFill = function () {
//   let element = this || ranges[0];

//   const rangeValue = (element.value / element.max) * 100;
//   element.nextElementSibling.style.width = `${rangeValue}%`;
// };

// addEventOnElements(ranges, "input", updateRangeFill);

/**
 * SEEK MUSIC
 *
 * seek podcast while changing player seek range
 */

// const seek = function () {
//   audioSource.currentTime = playerSeekRange.value;
//   playerRunningTime.textContent = getTimecode(playerSeekRange.value);
// };

// playerSeekRange.addEventListener("input", seek);

/**
 * END MUSIC
 */

// const isMusicEnd = function () {
//   if (audioSource.ended) {
//     playBtn.classList.remove("active");
//     audioSource.currentTime = 0;
//     playerSeekRange.value = audioSource.currentTime;
//     playerRunningTime.textContent = getTimecode(audioSource.currentTime);
//     updateRangeFill();
//   }
// };

/**
 * SKIP TO NEXT MUSIC
 */

const playerSkipNextBtn = document.querySelector("[data-skip-next]");

const skipNext = function () {
  lastPlayedMusic = currentMusic;

  if (isShuffled) {
    shuffleMusic();
  } else {
    currentMusic >= videoData.length - 1 ? (currentMusic = 0) : currentMusic++;
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
    currentMusic <= 0 ? (currentMusic = videoData.length - 1) : currentMusic--;
  }

  changePlayerInfo();
  changePlaylistItem();
};

playerSkipPrevBtn.addEventListener("click", skipPrev);

/**
 * SHUFFLE MUSIC
 */

/** get random number for shuffle */
const getRandomMusic = () => Math.floor(Math.random() * videoData.length);

const shuffleMusic = () => (currentMusic = getRandomMusic());

const playerShuffleBtn = document.querySelector("[data-shuffle]");
let isShuffled = false;

const shuffle = function () {
  playerShuffleBtn.classList.toggle("active");

  isShuffled = isShuffled ? false : true;
};

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

// const playerVolumeRange = document.querySelector("[data-volume]");
// const playerVolumeBtn = document.querySelector("[data-volume-btn]");

// const changeVolume = function () {
//   audioSource.volume = playerVolumeRange.value;
//   audioSource.muted = false;

//   if (audioSource.volume <= 0.1) {
//     playerVolumeBtn.children[0].textContent = "volume_mute";
//   } else if (audioSource.volume <= 0.5) {
//     playerVolumeBtn.children[0].textContent = "volume_down";
//   } else {
//     playerVolumeBtn.children[0].textContent = "volume_up";
//   }
// };

// playerVolumeRange.addEventListener("input", changeVolume);

/**
 * MUTE MUSIC
 */

// const muteVolume = function () {
//   if (!audioSource.muted) {
//     audioSource.muted = true;
//     playerVolumeBtn.children[0].textContent = "volume_off";
//   } else {
//     changeVolume();
//   }
// };

// playerVolumeBtn.addEventListener("click", muteVolume);
