document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const playButton = document.querySelector(".play");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    const seekBar = document.querySelector(".seek-bar");
    const currentTimeEl = document.querySelector(".current-time");
    const totalTimeEl = document.querySelector(".total-time");
    const volumeBar = document.querySelector(".volume-bar");
    const muteButton = document.querySelector(".mute");
    const trackTitle = document.querySelector(".track-title");
    const artistName = document.querySelector(".artist-name");
    const coverImg = document.querySelector(".cover-img");

    let audio = new Audio();
    let isPlaying = false;

    // Funzione per cercare e riprodurre una traccia da Deezer
    async function searchAndPlay(query) {
        const url = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`;
        try {
            let response = await fetch(url);
            let data = await response.json();
            let tracks = data.data;

            if (tracks.length > 0) {
                let firstTrack = tracks[0];
                trackTitle.textContent = firstTrack.title;
                artistName.textContent = firstTrack.artist.name;
                coverImg.src = firstTrack.album.cover_medium;

                audio.src = firstTrack.preview;
                audio.play();
                playButton.textContent = "⏸";
                isPlaying = true;
            } else {
                alert("Nessuna traccia trovata!");
            }
        } catch (error) {
            console.error("Errore nel caricamento della traccia:", error);
        }
    }

    // Evento sul bottone di ricerca
    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (query !== "") {
            searchAndPlay(query);
        }
    });

    // Play/Pausa
    playButton.addEventListener("click", () => {
        if (isPlaying) {
            audio.pause();
            playButton.textContent = "⏵";
        } else {
            audio.play();
            playButton.textContent = "⏸";
        }
        isPlaying = !isPlaying;
    });

    // Aggiornare la barra di avanzamento
    audio.addEventListener("timeupdate", () => {
        let progress = (audio.currentTime / audio.duration) * 100;
        seekBar.value = progress;
        currentTimeEl.textContent = formatTime(audio.currentTime);
        totalTimeEl.textContent = formatTime(audio.duration);
    });

    // Cambiare posizione della traccia
    seekBar.addEventListener("input", () => {
        audio.currentTime = (seekBar.value / 100) * audio.duration;
    });

    // Controllo volume
    volumeBar.addEventListener("input", () => {
        audio.volume = volumeBar.value / 100;
    });

    // Muto/Smuto
    muteButton.addEventListener("click", () => {
        if (audio.muted) {
            audio.muted = false;
            muteButton.textContent = "🔊";
        } else {
            audio.muted = true;
            muteButton.textContent = "🔇";
        }
    });

    // Formattare il tempo in MM:SS
    function formatTime(time) {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
});



