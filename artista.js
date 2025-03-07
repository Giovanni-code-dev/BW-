const endPoint = "https://striveschool-api.herokuapp.com/api/deezer";
const artistId = "290"; // ID artista da sostituire dinamicamente

// Funzione per ottenere dati artista
async function getArtist(id) {
    try {
        const response = await fetch(`${endPoint}/artist/${id}`);
        const artist = await response.json();

        document.getElementById("artist-image").src = artist.picture_big;
        document.getElementById("artist-name").innerText = artist.name;
        document.getElementById("monthly-listeners").innerText = `${artist.nb_fan} ascoltatori mensili`;

        getTopTracks(id);
    } catch (error) {
        console.log("Errore nel recupero dati artista:", error);
    }
}

// Funzione per ottenere i brani popolari
async function getTopTracks(id) {
    try {
        const response = await fetch(`${endPoint}/artist/${id}/top?limit=5`);
        const data = await response.json();

        const trackList = document.getElementById("track-list");
        trackList.innerHTML = "";

        data.data.forEach(track => {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item d-flex justify-content-between align-items-center";
            listItem.innerHTML = `
    <img src="${track.album.cover_small}" alt="cover">
    <div class="track-info text-white">
        <span class="track-title text-white">${track.title}</span>
        <span class="track-duration text-white">${(track.duration / 60).toFixed(2).replace('.', ':')}</span>
    </div>
`;

            trackList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Errore nel recupero dei brani:", error);
    }
}


// Array finto di ID brani che l'utente ha messo "Mi piace"
const likedTrackIds = [3135556, 3135558, 3135560]; // Esempio di ID

// Funzione per ottenere e mostrare i brani piaciuti
async function getLikedTracks() {
    try {
        const likedList = document.getElementById("liked-tracks");
        likedList.innerHTML = "";

        for (const trackId of likedTrackIds) {
            const response = await fetch(`${endPoint}/track/${trackId}`);
            const track = await response.json();

            const listItem = document.createElement("li");
            listItem.className = "list-group-item ";

            listItem.innerHTML = `
                <img src="${track.album.cover_small}" alt="cover">
                <div class="track-info text-white">
                    <span class="track-title text-white">${track.title}</span>
                    <span class="track-duration text-white">${(track.duration / 60).toFixed(2).replace('.', ':')}</span>
                </div>
            `;

            likedList.appendChild(listItem);
        }
    } catch (error) {
        console.error("Errore nel recupero dei brani che ti piacciono:", error);
    }
}




getArtist(artistId);
getLikedTracks();







































