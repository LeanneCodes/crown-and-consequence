// story.js

// --- SIMULATED DATA from your SQL INSERTS ---
const simulatedStories = [
    { id: 1, title: 'Crown & Consequence: The Battle of 1066', description: 'Explore the power struggle following Edward the Confessor’s death and the decisive battles that shaped Norman England.', is_active: true },
    { id: 2, title: 'Crown & Consequence: Tudor England', description: 'Learn key Tudor history decisions through interactive storytelling.', is_active: false },
    { id: 3, title: 'Crown & Consequence: The English Civil War', description: 'Navigate political and religious tensions between Parliament and the monarchy during England’s civil war.', is_active: false },
    // Only showing the first few for brevity, but all 10 would be here in a real scenario
];

const storyListContainer = document.getElementById('story-list');

/**
 * Generates the HTML string for a single story card.
 * @param {object} story The story object.
 */
function createStoryCardHTML(story) {
    const isLocked = !story.is_active;
    const lockedClass = isLocked ? 'locked' : 'active';
    const clickHandler = isLocked ? '' : `onclick="window.location.href='character.html?storyId=${story.id}'"`;
    const bannerIcon = isLocked ? '🔒' : '🔓'; // Using '🔓' for unlocked, '🔒' for locked
    const buttonText = isLocked ? 'Locked' : 'Select';
    const buttonDisabled = isLocked ? 'disabled' : '';

    return `
        <div class="story-card ${lockedClass}" ${clickHandler}>
            <div class="image-banner">${bannerIcon}</div>
            <div class="card-body">
                <h3>${story.title}</h3>
                <p>${story.description}</p>
                <button ${buttonDisabled}>${buttonText}</button>
            </div>
        </div>
    `;
}

/**
 * Renders all story cards into the container.
 */
function renderStories() {
    // Clear any existing content
    storyListContainer.innerHTML = ''; 

    // Filter to show only the stories defined in the SQL (first 10)
    simulatedStories.forEach(story => {
        storyListContainer.innerHTML += createStoryCardHTML(story);
    });
}


// Start the rendering process when the page loads
document.addEventListener('DOMContentLoaded', renderStories);
