function loadFriends() {
    let friends = JSON.parse(localStorage.getItem("friends")) || [];
    let friendListContainer = document.querySelector(".friend-list");

    friendListContainer.innerHTML = "";

    friends.forEach(friend => {
        let listItem = document.createElement("li");
        listItem.className = "friend-item";
        listItem.innerHTML = `
            <img src="${friend.image}" alt="${friend.username}">
            <div class="friend-info">
                <h6>${friend.name}</h6>
                <p>@${friend.username}</p>
            </div>
            <span class="time-ago">${friend.timeAgo}</span>
        `;
        friendListContainer.appendChild(listItem);
    });
}

// Chiama la funzione quando la pagina viene caricata
document.addEventListener("DOMContentLoaded", loadFriends);

// Funzione per aggiungere un nuovo amico
document.getElementById("friendForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("friendName").value;
    let username = document.getElementById("friendUsername").value;
    let image = document.getElementById("friendImage").value || "https://www.w3schools.com/w3images/avatar2.png"; // Default image

    let newFriend = {
        name: name,
        username: username,
        image: image,
        timeAgo: "Appena aggiunto"
    };

    let friends = JSON.parse(localStorage.getItem("friends")) || [];
    friends.push(newFriend);
    localStorage.setItem("friends", JSON.stringify(friends));

    alert(`Amico ${name} aggiunto con successo!`);
    loadFriends();
});