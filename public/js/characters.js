// js/characters.js
const wrapper = document.getElementById("characters-wrapper");
const params = new URLSearchParams(window.location.search);
const storyId = params.get("storyId");


if (!sessionStorage.getItem('session_started')) {
    sessionStorage.clear(); // Clears all progress
    sessionStorage.setItem('session_started', 'true');
    console.log("Terminal/Project restarted - Progress Reset.");
}
if (!storyId) {
    wrapper.textContent = "No story selected.";
} else {
    // 1. SESSION STORAGE: Progress resets when the browser tab is closed or server restarts.
    const progressLevel = Number(sessionStorage.getItem(`story_${storyId}_progress`)) || 0;

    fetch(`/api/stories/${storyId}/characters`)
    .then(res => res.json())
    .then(characters => {
        wrapper.innerHTML = "";

        characters.forEach((character, index) => {
            const card = document.createElement("div");
            card.className = "option-item";

            // 2. PROGRESSIVE UNLOCK: Index must be <= the number of times the story was passed.
            const isUnlocked = index <= progressLevel;

            // 3. STRICT TRACKING: 
            // We store the ID of the 'highest' unlocked character.
            // The end page will check if the user just played THIS specific ID to allow further unlocking.
            if (index === progressLevel) {
                sessionStorage.setItem(`last_unlocked_id_${storyId}`, character.id);
            }

            if (isUnlocked) {
                card.classList.add("active");
                card.onclick = () => {
                    // Send storyId AND characterId to the scene
                    window.location.href = `/scene.html?storyId=${storyId}&characterId=${character.id}`;
                };
            } else {
                card.classList.add("locked");
                card.style.opacity = "0.6";
                card.style.filter = "grayscale(100%)";
                // Lock interaction
                card.onclick = null;
            }

            // Image Wrapper
            const imageWrapper = document.createElement("div");
            imageWrapper.style.width = "100%";
            imageWrapper.style.height = "160px";
            imageWrapper.style.overflow = "hidden";
            imageWrapper.style.borderRadius = "8px";
            imageWrapper.style.background = "#f2f2f2";

            const img = document.createElement("img");
            img.src = character.image;
            img.alt = character.name;
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.objectFit = "cover";
            imageWrapper.appendChild(img);

            const name = document.createElement("h3");
            name.textContent = character.name;

            const description = document.createElement("p");
            description.textContent = character.description;

            card.append(imageWrapper, name, description);

            // UI Button Logic
            if (isUnlocked) {
                const button = document.createElement("button");
                button.textContent = "Select Character";
                button.className = "select-btn";
                card.appendChild(button);
            } else {
                const lockMsg = document.createElement("div");
                lockMsg.style.marginTop = "10px";
                lockMsg.style.fontSize = "0.9rem";
                lockMsg.style.color = "#666";
                lockMsg.innerHTML = "<span>🔒 Complete story with previous character to unlock</span>";
                card.appendChild(lockMsg);
            }

            wrapper.appendChild(card);
        });
    })
    .catch(err => {
        wrapper.textContent = "Something went wrong loading characters.";
        console.error(err);
    });
}