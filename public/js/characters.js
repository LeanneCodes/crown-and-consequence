<<<<<<< HEAD
// character.js

// --- SIMULATED DATA from your SQL INSERTS (Filtering by story_id = 1) ---
const simulatedCharacters = [
    { id: 1, story_id: 1, name: 'Harold Godwinson', description: 'The last Anglo-Saxon King of England...', image: 'HG', is_active: true },
    { id: 2, story_id: 1, name: 'William of Normandy', description: 'Duke of Normandy who claimed the English throne...', image: 'WN', is_active: false },
    { id: 3, story_id: 1, name: 'Edward the Confessor', description: 'King of England whose death without an heir...', image: 'EC', is_active: false },
    { id: 4, story_id: 1, name: 'Harald Hardrada', description: 'King of Norway who invaded England...', image: 'HH', is_active: false },
    { id: 5, story_id: 1, name: 'Tostig Godwinson', description: 'Harold Godwinson’s exiled brother...', image: 'TG', is_active: false },
    { id: 6, story_id: 1, name: 'Edgar Ætheling', description: 'The last male heir of the House of Wessex...', image: 'EA', is_active: false },
];

const characterGrid = document.getElementById('character-grid');

/**
 * Extracts a query parameter from the URL.
 */
function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

/**
 * Generates the HTML string for a single character card.
 * @param {object} character The character object.
 */
function createCharacterCardHTML(character) {
    const isLocked = !character.is_active;
    const lockedClass = isLocked ? 'locked' : 'active';
    // Link to the game scene, passing the character ID
    const clickHandler = isLocked ? '' : `onclick="window.location.href='scene.html?charId=${character.id}'"`; 
    const buttonText = isLocked ? 'Locked' : 'Select';
    const buttonDisabled = isLocked ? 'disabled' : '';

    return `
        <div class="option-item ${lockedClass}" ${clickHandler}>
            <div class="image-placeholder">${isLocked ? '🔒' : character.image}</div>
            <h3>${character.name}</h3>
            <button ${buttonDisabled}>${buttonText}</button>
        </div>
    `;
}

/**
 * Renders characters based on the selected story ID.
 */
function renderCharacters() {
    const storyId = getQueryParameter('storyId');
    // In a real app, you'd fetch characters via API:
    // fetch(`/api/characters/story/${storyId}`)...
    
    // SIMULATION: Filter the data based on the story ID
    const filteredCharacters = simulatedCharacters.filter(c => c.story_id == storyId || c.story_id === 1); 

    // For the initial build, we show all characters from story 1 regardless of the passed ID
    // if (!storyId) {
    //     // Default to Story 1 if no ID is provided (e.g., direct navigation)
    // }

    // Clear any existing content
    characterGrid.innerHTML = ''; 

    filteredCharacters.forEach(character => {
        characterGrid.innerHTML += createCharacterCardHTML(character);
    });
}

// Start the rendering process when the page loads
document.addEventListener('DOMContentLoaded', renderCharacters);
=======
const wrapper = document.getElementById("characters-wrapper");

// get storyId from URL
const params = new URLSearchParams(window.location.search);
const storyId = params.get("storyId");

if (!storyId) {
  wrapper.textContent = "No story selected.";
  throw new Error("Missing storyId");
}

fetch(`/api/stories/${storyId}/characters`)
  .then(res => res.json())
  .then(characters => {
    wrapper.innerHTML = "";

    console.log(characters)

    characters.forEach((character, index) => {
      const card = document.createElement("div");
      card.className = "option-item";

      // only first character selectable
      if (index === 0) {
        card.classList.add("active");
        card.onclick = () => {
          window.location.href = `/scenes?storyId=${storyId}&characterId=${character.id}`;
        };
      } else {
        card.classList.add("locked");
      }

     // image wrapper
    const imageWrapper = document.createElement("div");
    imageWrapper.style.width = "100%";
    imageWrapper.style.height = "160px";
    imageWrapper.style.overflow = "hidden";
    imageWrapper.style.borderRadius = "8px";
    imageWrapper.style.background = "#f2f2f2";

    // image
    const img = document.createElement("img");
    img.src = character.image;
    img.alt = character.name;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.style.display = "block";

    imageWrapper.appendChild(img);


      const name = document.createElement("h3");
      name.textContent = character.name;

      const description = document.createElement("p");
      description.textContent = character.description;

      card.append(imageWrapper, name, description);

      if (index === 0) {
        const button = document.createElement("button");
        button.textContent = "Select";
        card.appendChild(button);
      }

      wrapper.appendChild(card);
    });
  })
  .catch(err => {
    wrapper.textContent = "Something went wrong loading characters.";
    console.error(err);
  });
>>>>>>> 2f2921bf14651529aa6f91c9b28d55061656692f
