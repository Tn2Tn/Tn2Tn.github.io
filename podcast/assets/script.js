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
    posterUrl: "assets/images/episode04.png",
    title: "Jaaayson For The Naaation",
    guest: "Binyomin Jayson & Yehuda Stone",
    episode: "4",
    summary: "Listen to Binyomin Jayson speak about politics and who knows what, sing (like a Chazon) and give shout outs to everyone who lives on earth well almost. Keep an ear out for Yehuda Stones short words every now and then.",
    podcastPath: "assets/audio/Stone_&_Jayson.mp3",
  },
  {
    "posterUrl": "assets/images/episode03.png",
    "title": "Chassidish Wikipedia",
    "guest": "Ahron Cowen",
    "episode": "3",
    "summary": "Listen to Ahron Cowen speak about chassidim sharing a small percentage of his large knowledge about them. Litvaks Don't Have To Agree. Winners Of The Purim Survey Are: R Ross, Fler & Allan Davis",
    "podcastPath": "assets/audio/Ahron Cowen.mp3"
  },
  {
    "posterUrl": "assets/images/episode02.png",
    "title": "Daily Quota",
    "guest": "Shloimy Blun & Surprise Guest",
    "episode": "2",
    "summary": "An interview with Shloimy Blum discussing his daily Quote, many jokes, his revolution and controversial debates. (07565954248)x∞  P.S. NOT ALL RESPONSES ARE ENDORSED BY MECHANCHIM",
    "podcastPath": "assets/audio/Sloimy Blun & surprise.mp3"
  },
   {
     "posterUrl": "assets/images/episode01.png",
     "title": "Baal Musar",
     "guest": "Eliezer Kahn",
     "episode": "1",
     "summary": "Listen to Eliezer give life musar to all listeners under 90 years young and list 16/21 nicknames  Thank you to MGS for making this episode come out late",
     "podcastPath": "assets/audio/Eliezer Podcast.mp3"
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
  playerTitle.textContent = podcastData[currentMusic].title;
  playerAlbum.textContent = podcastData[currentMusic].guest;
  playerYear.textContent = "Episode: " + podcastData[currentMusic].episode;
  playerArtist.textContent = podcastData[currentMusic].summary;

  audioSource.src = podcastData[currentMusic].podcastPath;

  audioSource.addEventListener("loadeddata", updateDuration);
  playMusic();
};

addEventOnElements(playlistItems, "click", changePlayerInfo);

// Set player info on load
const setPlayerInfo = function () {
  playerBanner.src = podcastData[currentMusic].posterUrl;
  playerBanner.setAttribute("alt", `${podcastData[currentMusic].title} Album Poster`);
  playerTitle.textContent = podcastData[currentMusic].title;
  playerAlbum.textContent = podcastData[currentMusic].guest;
  playerYear.textContent = "Episode: " + podcastData[currentMusic].episode;
  playerArtist.textContent = podcastData[currentMusic].summary;

  audioSource.src = podcastData[currentMusic].podcastPath;
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
  const currentPodcast = podcastData[currentMusic];
  const podcastUrl = currentPodcast.podcastPath;
  
  // Create a temporary anchor element to trigger the download
  const anchor = document.createElement("a");
  anchor.href = podcastUrl;
  anchor.download = `Tn2Tn Podcast Episode ${currentPodcast.episode} - ${currentPodcast.guest}.mp3`; // Set the filename for download
  anchor.click();

  // Remove the anchor element from the DOM
  anchor.remove();
});


