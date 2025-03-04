const endPoint = "https://striveschool-api.herokuapp.com/api/deezer";
const artistId = "5768"; // ID artista da sostituire dinamicamente

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
                <img src="${track.album.cover_small}" alt="cover" class="me-3">
                <span>${track.title}</span>
                <span>${(track.duration / 60).toFixed(2).replace('.', ':')}</span>
            `;
            trackList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Errore nel recupero dei brani:", error);
    }
}

getArtist(artistId);







































// const = "https://striveschool-api.herokuapp.com/api/deezer/search?q={query}"
// const artistEndpoint ="https://striveschool-api.herokuapp.com/api/deezer/artist/{id}"

// //area elementi dom


// //funzione fetch ricerca
// function getArtist(id){
//     fetch(EndPoint)
//     .then(response => response.json())
//     .then(data => 
//         console.log(data)
//         )
//     .catch(error => console.log(error))
// }



// getArtist()