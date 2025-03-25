document.addEventListener("DOMContentLoaded", () => {
    // Player Controls
    const playBtn = document.querySelector('[data-play-btn]');
    const playerSeekRange = document.querySelector('[data-seek]');
    const playerRunningTime = document.querySelector('[data-running-time]');
    const playerDuration = document.querySelector('[data-duration]');
    const replayBtn = document.querySelector('[data-replay]');
    const forwardBtn = document.querySelector('[data-forward]');
    const speedInput = document.getElementById('speed-input');
    const downloadBtn = document.getElementById('download-btn');
    const skipBtn = document.querySelector('[data-skip-btn]');

    // Declare playInterval in this scope
    let playInterval;

    // Function to save podcast progress
    const savePodcastProgress = () => {
        const currentPodcast = podcastData[currentMusic];
        const duration = audioSource.duration;
        const currentTime = audioSource.currentTime;
        const percentagePlayed = (currentTime / duration) * 100;

        // Use podcast date as the cookie name (URL-encoded to handle special characters)
        const cookieName = `podcast_progress_${encodeURIComponent(currentPodcast.date.replace(/\s+/g, '_'))}`;

        // Save progress as a cookie
        document.cookie = `${cookieName}=${JSON.stringify({
            currentTime: currentTime,
            percentagePlayed: percentagePlayed,
            podcastPath: currentPodcast.podcastPath
        })}; path=/; SameSite=Strict; expires=Fri, 31 Dec 9999 23:59:59 GMT`;

        // Call updatePlaylistProgress if the function exists in playlist.js
        if (typeof updatePlaylistProgress === 'function') {
            updatePlaylistProgress(currentMusic, percentagePlayed);
        }
    };

    // Function to load podcast progress
    const loadPodcastProgress = () => {
        const currentPodcast = podcastData[currentMusic];
        const cookieName = `podcast_progress_${encodeURIComponent(currentPodcast.date.replace(/\s+/g, '_'))}`;

        // Find the cookie
        const cookies = document.cookie.split('; ');
        const progressCookie = cookies.find(row => row.startsWith(`${cookieName}=`));

        if (progressCookie) {
            const progressData = JSON.parse(progressCookie.split('=')[1]);
            
            // Ensure the podcast path matches to prevent loading progress for a different podcast
            if (progressData.podcastPath === currentPodcast.podcastPath) {
                // Restore progress if it's less than 100% of the total duration
                if (progressData.percentagePlayed < 100) {
                    // Immediately set current time
                    audioSource.currentTime = progressData.currentTime;
                    
                    // Update seek range and running time
                    playerSeekRange.value = progressData.currentTime;
                    playerRunningTime.textContent = getTimecode(progressData.currentTime);
                    
                    // Update range fill
                    const rangeValue = (progressData.currentTime / audioSource.duration) * 100;
                    document.querySelector('[data-range-fill]').style.width = `min(calc(${rangeValue}% + 1px), 100%)`;
                    
                    // Call updatePlaylistProgress if the function exists in playlist.js
                    if (typeof updatePlaylistProgress === 'function') {
                        updatePlaylistProgress(currentMusic, progressData.percentagePlayed);
                    }
                }
            }
        }
    };

    // Get Timecode Function
    const getTimecode = (duration) => {
        const minutes = Math.floor(duration / 60);
        const seconds = Math.ceil(duration - minutes * 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    // Update Duration
    const updateDuration = () => {
        playerSeekRange.max = Math.ceil(audioSource.duration);
        playerDuration.textContent = getTimecode(Number(playerSeekRange.max));
        checkSkipButtonVisibility(); // Check visibility after duration is updated

        // Load podcast progress immediately after duration is set
        loadPodcastProgress();
    };

    // Modify the event listener to load progress before other actions
    audioSource.addEventListener('loadedmetadata', () => {
        updateDuration();
        
    });
    audioSource.addEventListener('loadeddata', updateDuration);

    // Range Fill Update
    const updateRangeFill = () => {
        const rangeValue = (playerSeekRange.value / playerSeekRange.max) * 100;
        document.querySelector('[data-range-fill]').style.width = `min(calc(${rangeValue}% + 1px), 100%)`;
        checkSkipButtonVisibility(); // Check visibility on range update
    };

    // Play/Pause
    window.playMusic = function () {
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
    
    playBtn.addEventListener('click', playMusic);

    // Spacebar Play/Pause
    document.addEventListener('keydown', (event) => {
        if (event.keyCode === 32) {
            event.preventDefault();
            playMusic();
        }
    });

    // Seek Range
    const seek = () => {
        audioSource.currentTime = playerSeekRange.value;
        playerRunningTime.textContent = getTimecode(playerSeekRange.value);
        updateRangeFill();
    };
    playerSeekRange.addEventListener('input', seek);

    // Running Time Update with Progress Saving
    const updateRunningTime = () => {
        playerSeekRange.value = audioSource.currentTime;
        playerRunningTime.textContent = getTimecode(audioSource.currentTime);
        updateRangeFill();

        // Save progress when the track is playing
        if (!audioSource.paused) {
            savePodcastProgress();
        }

        // Check if music has ended
        if (audioSource.ended) {
            playBtn.classList.remove('active');
            audioSource.currentTime = 0;
            playerSeekRange.value = 0;
            playerRunningTime.textContent = getTimecode(0);
            updateRangeFill();
            clearInterval(playInterval);
        }
    };

    // Replay (10 seconds back)
    const replay = () => {
        audioSource.currentTime -= 10;
        if (audioSource.paused) {
            playMusic();
        }
    };
    replayBtn.addEventListener('click', replay);

    // Forward (30 seconds ahead)
    const forward = () => {
        audioSource.currentTime += 30;
        if (audioSource.paused) {
            playMusic();
        }
    };
    forwardBtn.addEventListener('click', forward);

    // Playback Speed
    const speeds = [1, 1.25, 1.5, 1.75, 2];
    let currentSpeedIndex = 0;
    
    speedInput.addEventListener('click', () => {
        currentSpeedIndex = (currentSpeedIndex + 1) % speeds.length;
        const selectedSpeed = speeds[currentSpeedIndex];
        audioSource.playbackRate = selectedSpeed;
        speedInput.textContent = selectedSpeed + "x";
    
        // Change color based on selected speed
        speedInput.style.color = selectedSpeed === 1 
            ? "#fff" 
            : "var(--primary)";
    
        // Change font size based on selected speed and screen width
        const isMobile = window.matchMedia("(max-width: 1200px)").matches;
    
        if (selectedSpeed === 1 || selectedSpeed === 2) {
            speedInput.style.fontSize = isMobile ? "1rem" : "1.2rem";
        } else {
            speedInput.style.fontSize = isMobile ? "0.85rem" : "1rem";
        }
    });

    // Download Button
    downloadBtn.addEventListener("click", function () {
        // Get the current podcast's audio file URL
        const currentPodcast = podcastData[currentMusic];
        const podcastUrl = currentPodcast.podcastPath;

        // Create a temporary anchor element to trigger the download
        const anchor = document.createElement("a");
        anchor.href = podcastUrl;
        anchor.download = `Tn2Tn Podcast Episode - ${currentPodcast.guest}.mp3`; // Set the filename for download
        anchor.click();

        // Remove the anchor element from the DOM
        anchor.remove();
    });

    // Skip Button Visibility Check
    const checkSkipButtonVisibility = () => {
        const duration = audioSource.duration;
        const currentTime = audioSource.currentTime;
    
        // Show the skip button if the duration is greater than 20 minutes and current time is less than 25 seconds
        if (duration > 1200 && currentTime < 29) {
            skipBtn.classList.add('visible');
            skipBtn.classList.remove('fade-out');
        } else {
            skipBtn.classList.add('fade-out');
        }
        
        if (duration < 1200 || currentTime > 31) {
            skipBtn.classList.remove('visible');
        }
    };

    // Add event listener for the skip button
    skipBtn.addEventListener('click', () => {
        audioSource.currentTime = 30; // Skip to 30 seconds
        playerSeekRange.value = 30; // Update the seek range
        playerRunningTime.textContent = getTimecode(30); // Update the running time display
        updateRangeFill(); // Update the range fill
    });

    // Update the skip button visibility on time update
    audioSource.addEventListener('timeupdate', checkSkipButtonVisibility);

    // Modify changePlayerInfo to load progress (if such a function exists)
    if (typeof changePlayerInfo === 'function') {
        const originalChangePlayerInfo = changePlayerInfo;
        window.changePlayerInfo = function() {
            // Call the original function first
            originalChangePlayerInfo.call(this);
            
            // Then load progress for the new podcast
            loadPodcastProgress();
        };
    }
});
