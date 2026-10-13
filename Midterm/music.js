let termInput = document.querySelector("#termInput");
let typeSelect = document.querySelector("#typeSelect");
let resultsDiv = document.querySelector("#results");
let resultsMessage = document.querySelector("#resultsMessage");
let resetBtn = document.querySelector("#resetBtn");

termInput.addEventListener("input", getMusic);
typeSelect.addEventListener("change", getMusic);
resetBtn.addEventListener("click", resetFilters);

resetFilters();


async function getMusic() {
    let term = termInput.value.trim();
    let type = typeSelect.value;
    let url = "https://itunes.apple.com/search?media=music&limit=50";

    if (term == "") {
        resultsDiv.innerHTML = "";
        resultsMessage.textContent = "Type an artist or song to search.";
        return;
    }

    url += "&term=" + encodeURIComponent(term);

    if (type != "") {
        url += "&entity=" + type;
    }

    let response = await fetch(url);
    if (!response.ok) {
        resultsDiv.innerHTML = "";
        resultsMessage.textContent = "No music found.";
        return;
    }
    let data = await response.json();

    if (data.resultCount == 0) {
        resultsDiv.innerHTML = "";
        resultsMessage.textContent = "No music found.";
        return;
    }
    resultsMessage.textContent = data.resultCount + " results found";

    resultsDiv.innerHTML = "";
    for (let item of data.results) {
        let card = document.createElement("div");
        card.className = "result-card";

        let img = document.createElement("img");
        img.src = item.artworkUrl100;
        img.alt = "Cover art";

        let title = document.createElement("h3");
        if (item.trackName != undefined) {
            title.textContent = item.trackName;
        } else {
            title.textContent = item.collectionName;
        }

        let artist = document.createElement("p");
        artist.textContent = item.artistName;

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(artist);
        resultsDiv.appendChild(card);
    }
}

function resetFilters() {
    termInput.value = "";
    typeSelect.value = "";
    resultsDiv.innerHTML = "";
    resultsMessage.textContent = "Type an artist or song to search.";
}