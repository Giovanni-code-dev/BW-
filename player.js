document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const playButton = document.querySelector(".play i"); // Seleziona direttamente l'icona dentro il bottone
    const playButtonContainer = document.querySelector(".play"); // Seleziona il bottone per gli eventi
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    const seekBar = document.querySelector(".seek-bar");
    const currentTimeEl = document.querySelector(".current-time");
    const totalTimeEl = document.querySelector(".total-time");
    const volumeBar = document.querySelector(".volume-bar");
    const muteButton = document.querySelector(".mute i"); // Seleziona direttamente l'icona dentro il bottone
    const muteButtonContainer = document.querySelector(".mute"); // Seleziona il bottone per gli eventi
    const trackTitle = document.querySelector(".track-title");
    const artistName = document.querySelector(".artist-name");
    const coverImg = document.querySelector(".cover-img");
    const shuffleButton = document.querySelector(".shuffle");
    const repeatButton = document.querySelector(".repeat");

    let audio = new Audio();
    let isPlaying = false;
    let isShuffle = false;
    let isRepeat = false;
    let trackList = [];
    let currentTrackIndex = 0;

    // Funzionalità di navigazione tra le pagine
    const prevPageButton = document.querySelector(".prev-page");
    const nextPageButton = document.querySelector(".next-page");

    prevPageButton.addEventListener("click", () => {
        window.history.back();
    });

    nextPageButton.addEventListener("click", () => {
        window.history.forward();
    });

    async function searchAndPlay(query) {
        const url = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`;
        try {
            let response = await fetch(url);
            let data = await response.json();
            trackList = data.data;

            if (trackList.length > 0) {
                currentTrackIndex = 0;
                playTrack(currentTrackIndex);
            } else {
                alert("Nessuna traccia trovata!");
            }
        } catch (error) {
            console.error("Errore nel caricamento della traccia:", error);
        }
    }

    function playTrack(index) {
        let track = trackList[index];
        if (!track) return;

        trackTitle.textContent = track.title;
        artistName.textContent = track.artist.name;
        coverImg.src = track.album.cover_medium;

        audio.src = track.preview;
        audio.play();
        updatePlayButton(true);
    }

    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (query !== "") {
            searchAndPlay(query);
        }
    });

    playButtonContainer.addEventListener("click", () => {
        if (isPlaying) {
            audio.pause();
            updatePlayButton(false);
        } else {
            audio.play();
            updatePlayButton(true);
        }
    });

    function updatePlayButton(playing) {
        isPlaying = playing;
        playButton.classList.toggle("fa-circle-play", !playing);
        playButton.classList.toggle("fa-circle-pause", playing);
    }

    prevButton.addEventListener("click", () => {
        currentTrackIndex = currentTrackIndex > 0 ? currentTrackIndex - 1 : trackList.length - 1;
        playTrack(currentTrackIndex);
    });

    nextButton.addEventListener("click", () => {
        if (isShuffle) {
            currentTrackIndex = Math.floor(Math.random() * trackList.length);
        } else {
            currentTrackIndex = (currentTrackIndex + 1) % trackList.length;
        }
        playTrack(currentTrackIndex);
    });

    shuffleButton.addEventListener("click", () => {
        isShuffle = !isShuffle;
        shuffleButton.style.color = isShuffle ? "green" : "black";
    });

    repeatButton.addEventListener("click", () => {
        isRepeat = !isRepeat;
        repeatButton.style.color = isRepeat ? "green" : "black";
    });

    audio.addEventListener("ended", () => {
        if (isRepeat) {
            playTrack(currentTrackIndex);
        } else {
            nextButton.click();
        }
    });

    audio.addEventListener("timeupdate", () => {
        let progress = (audio.currentTime / audio.duration) * 100;
        seekBar.value = progress;
        currentTimeEl.textContent = formatTime(audio.currentTime);
        totalTimeEl.textContent = formatTime(audio.duration);
    });

    seekBar.addEventListener("input", () => {
        audio.currentTime = (seekBar.value / 100) * audio.duration;
    });

    volumeBar.addEventListener("input", () => {
        audio.volume = volumeBar.value / 100;
    });

    muteButtonContainer.addEventListener("click", () => {
        audio.muted = !audio.muted;
        muteButton.classList.toggle("fa-volume-high", !audio.muted);
        muteButton.classList.toggle("fa-volume-xmark", audio.muted);
    });

    function formatTime(time) {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
});







