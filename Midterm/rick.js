let nameInput = document.querySelector("#nameInput");
let nameError = document.querySelector("#nameError");
let genderSelect = document.querySelector("#genderSelect");
let statusRadios = document.querySelectorAll('input[name="status"]');
let resultsDiv = document.querySelector("#results");
let resultsMessage = document.querySelector("#resultsMessage");
nameInput.addEventListener("input", getCharacters);
genderSelect.addEventListener("change", getCharacters);
for (let radio of statusRadios) {
    radio.addEventListener("change", getCharacters);
}
let resetBtn = document.querySelector("#resetBtn");
resetBtn.addEventListener("click", resetFilters);
resetFilters();


async function getCharacters() {
    let name = nameInput.value.trim();
    let gender = genderSelect.value;
    let checkedStatus = document.querySelector('input[name="status"]:checked');
    let url = "https://rickandmortyapi.com/api/character/?";
    let filterCount = 0;

    if (!isValidName(name)) {
        resultsDiv.innerHTML = "";
        resultsMessage.textContent = "";
        return;
    }

    if (name != "") {
        url += "&name=" + name;
        filterCount++;
    }
    if (checkedStatus != null) {
        url += "&status=" + checkedStatus.value;
        filterCount++;
    }
    if (gender != "") {
        url += "&gender=" + gender;
        filterCount++;
    }

    if (filterCount == 0) {
        resultsDiv.innerHTML = "";
        resultsMessage.textContent = "Choose a filter to see characters.";
        return;
    }

    let response = await fetch(url);
    if (!response.ok) {
        resultsDiv.innerHTML = "";
        resultsMessage.textContent = "No characters found.";
        return;
    }
    let data = await response.json();
    resultsMessage.textContent = data.info.count + " characters found";

    resultsDiv.innerHTML = "";
    for (let character of data.results) {
        let card = document.createElement("div");
        card.className = "result-card";

        let img = document.createElement("img");
        img.src = character.image;
        img.alt = character.name;

        let nameHead = document.createElement("h3");
        nameHead.textContent = character.name;

        let species = document.createElement("p");
        species.textContent = character.species + " · " + character.status;
        
        card.appendChild(img);
        card.appendChild(nameHead);
        card.appendChild(species);
        resultsDiv.appendChild(card);
    }
}

function resetFilters() {
    nameError.textContent = "";
    nameInput.value = "";
    for (let radio of statusRadios) {
        radio.checked = false;
    }
    genderSelect.value = "";
    resultsDiv.innerHTML = "";
    resultsMessage.textContent = "Choose a filter to see characters.";
}

function isValidName(name) {
    if (name.length > 20) {
        nameError.textContent = "Name must be 20 characters or less.";
        return false;
    }

    let allowed = /^[a-zA-Z '-]*$/;
    if (!allowed.test(name)) {
        nameError.textContent = "Letters only, please (no numbers or symbols).";
        return false;
    }

    nameError.textContent = "";
    return true;
}