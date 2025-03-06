function toggleFriends() {
    let friendList = document.getElementById("friend-list");
    friendList.style.display = (friendList.style.display === "none") ? "block" : "none";
}

function addFriend() {
    window.location.href = "addFriend.html";
}

function loadFriends() {
    let friends = JSON.parse(localStorage.getItem("friends")) || [];
    let friendListContainer = document.querySelector(".friend-list");

    friendListContainer.innerHTML = ""; // Svuota la lista prima di ricaricare

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

// Carica gli amici quando la pagina viene caricata
document.addEventListener("DOMContentLoaded", loadFriends);


