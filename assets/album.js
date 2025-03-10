async function fetchAlbumData(albumId) {
    const API_URL = `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`;

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Errore nel recupero dell'album");

        const albumData = await response.json();

        console.log("Dati ricevuti:", albumData); // Debug

        // Aggiorniamo la pagina con le info dell'album
        document.getElementById("album-cover").src = albumData.cover_big;
        document.getElementById("album-title").textContent = albumData.title;
        document.getElementById("album-artist").textContent = albumData.artist.name;
        document.getElementById("album-year").textContent = albumData.release_date.split("-")[0];

        // Controlliamo se ci sono tracce prima di procedere
        if (!albumData.tracks || !albumData.tracks.data || albumData.tracks.data.length === 0) {
            console.error("Nessuna traccia trovata per questo album.");
            return;
        }

        //  player globale
        const playerCover = document.querySelector(".cover-img"); // Copertina nel player
        const playerTitle = document.querySelector(".track-title"); // Titolo traccia nel player
        const playerArtist = document.querySelector(".artist-name"); // Artista nel player
        const playButton = document.querySelector(".play"); // Pulsante Play

        
        let globalAudioPlayer = document.querySelector("audio");
        if (!globalAudioPlayer) {
            console.error("Elemento <audio> non trovato! Assicurati che il player.js gestisca l'audio.");
        }

        // Generiamo la lista delle tracce
        const tracklistElement = document.getElementById("tracklist");
        tracklistElement.innerHTML = ""; // Svuotiamo la lista

        albumData.tracks.data.forEach((track, index) => {
            console.log(`Traccia ${index + 1}:`, track); // Debug

            const trackItem = document.createElement("li");
            trackItem.className = "list-group-item d-flex justify-content-between align-items-center track-item";
            trackItem.dataset.trackUrl = track.preview; // URL della traccia
            trackItem.dataset.trackTitle = track.title; // Titolo della traccia
            trackItem.dataset.trackArtist = albumData.artist.name; // Nome dell'artista
            trackItem.dataset.trackCover = albumData.cover_big; // Copertina

            trackItem.innerHTML = `
                <span>${index + 1}. ${track.title}</span>
                <span>${Math.floor(track.duration / 60)}:${(track.duration % 60).toString().padStart(2, '0')}</span>
            `;

            // Quando clicchiamo su una traccia aggiorniamo il player globale
            trackItem.addEventListener("click", function () {
                if (globalAudioPlayer) {
                    globalAudioPlayer.src = this.dataset.trackUrl; // Cambiamo l'audio
                    globalAudioPlayer.play(); // Facciamo partire la traccia
                }
                if (playerCover) {
                    playerCover.src = this.dataset.trackCover; 
                }
                if (playerTitle) {
                    playerTitle.textContent = this.dataset.trackTitle; 
                }
                if (playerArtist) {
                    playerArtist.textContent = this.dataset.trackArtist; 
                }
            });

            tracklistElement.appendChild(trackItem);
        });

    } catch (error) {
        console.error("Errore durante il fetch dei dati:", error);
    }
}

// Recuperiamo l'ID e chiamiamo la funzione
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const albumId = urlParams.get("id");

    console.log("Album ID trovato:", albumId); // Debug

    if (albumId) {
        fetchAlbumData(albumId);
    } else {
        console.error("Nessun ID album fornito nella URL.");
    }
});