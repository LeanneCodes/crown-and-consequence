// scene.js

// --- CONFIGURATION / GLOBAL STATE ---
const CONFIG = {
    USER_ID: 1, 
    STORY_ID: 1,
    CHARACTER_ID: 1,
    API_BASE_URL: 'http://localhost:3000/api' // Replace with your actual API endpoint
};

// Global variables for game state
let currentSceneData = null; 
let gameScore = 0; // Initialize score tracking

// --- DOM ELEMENTS ---
const elements = {
    scoreDisplay: document.getElementById('current-score'),
    narrationArea: document.getElementById('narration-area'),
    narrativeText: document.getElementById('narrative-text'),
    nextButton: document.getElementById('next-button'),
    questionSection: document.getElementById('question-section'),
    questionText: document.getElementById('question-text'),
    optionsSection: document.getElementById('options-section'),
    optionA: document.getElementById('option-a'),
    optionB: document.getElementById('option-b'),
};


// --- CORE GAME LOGIC ---

/**
 * Updates the score display in the header.
 */
function updateScoreDisplay() {
    elements.scoreDisplay.textContent = `Score: ${gameScore}`;
}

/**
 * Shows the question and options, hiding the narrative overlay.
 */
function showQuestionAndOptions() {
    elements.narrationArea.classList.add('hidden');
    elements.questionSection.classList.remove('hidden');
    elements.optionsSection.classList.remove('hidden');
}

/**
 * Populates the HTML elements with the scene data.
 * @param {object} scene The scene data object from the backend.
 */
function renderScene(scene) {
    currentSceneData = scene;
    
    // Reset Visibility
    elements.narrationArea.classList.remove('hidden');
    elements.questionSection.classList.add('hidden');
    elements.optionsSection.classList.add('hidden');

    // Populate Content
    elements.narrativeText.textContent = scene.narrative;
    elements.questionText.textContent = scene.question;
    elements.optionA.textContent = scene.option_a;
    elements.optionB.textContent = scene.option_b;
    
    // Ensure the score is updated on every scene load
    updateScoreDisplay();
}


// --- EVENT LISTENERS ---

// Listener for the "Next" button in the narration overlay
elements.nextButton.addEventListener('click', showQuestionAndOptions);

// Listeners for the option buttons
elements.optionA.addEventListener('click', () => handleOptionClick('A'));
elements.optionB.addEventListener('click', () => handleOptionClick('B'));

/**
 * Handles the user clicking an answer option, updates the score, and loads the next scene.
 * @param {string} choice 'A' or 'B'
 */
async function handleOptionClick(choice) {
    if (!currentSceneData) return;

    const isCorrect = choice === currentSceneData.correct_option;
    
    // 1. SCORING LOGIC
    if (isCorrect) {
        // Points are defined in your DB, but you requested 1 point for correct
        const pointsAwarded = 1; 
        gameScore += pointsAwarded;
        updateScoreDisplay(); // Update display immediately
    }
    
    // 2. Give Feedback (optional, but good for UX)
    alert(isCorrect 
        ? currentSceneData.feedback_correct 
        : currentSceneData.feedback_wrong
    );
    
    // 3. Check for Final Scene
    if (currentSceneData.is_final) {
        // Store final score in local storage to retrieve on end.html
        localStorage.setItem('finalGameScore', gameScore);
        
        // Redirect to the final page
        window.location.href = 'end.html'; 
    } else {
        // Load the next scene
        const nextSceneOrder = currentSceneData.scene_order + 1;
        loadSceneByOrder(nextSceneOrder); 
    }
}


/**
 * Simulates fetching scene data from the backend.
 * (Uses hardcoded data array for frontend testing)
 */
async function loadSceneByOrder(order) {
    // --- THIS IS WHERE YOU'D MAKE A REAL API CALL ---
    // Example: fetch(`${CONFIG.API_BASE_URL}/scenes/${CONFIG.CHARACTER_ID}/${order}`);

    // *** SIMULATED DATA from your SQL INSERTS ***
    const simulatedScenes = [
        { id: 1, character_id: 1, scene_order: 1, narrative: 'Edward the Confessor has died without a clear heir. As Earl of Wessex, Harold Godwinson claims that Edward promised him the throne.', question: 'What should Harold do next?', option_a: 'Accept the crown and become King of England', option_b: 'Step aside and support another claimant', correct_option: 'A', feedback_correct: 'Correct. Harold was crowned King in January 1066.', feedback_wrong: 'Incorrect. Harold chose to claim the throne himself.', is_final: false },
        { id: 2, character_id: 1, scene_order: 2, narrative: 'Harold learns that his brother Tostig has allied with the Norwegian king Harald Hardrada and invaded northern England.', question: 'How should Harold respond to this threat?', option_a: 'March north immediately to confront the invaders', option_b: 'Remain in the south to defend against Normandy', correct_option: 'A', feedback_correct: 'Correct. Harold marched north and defeated the Norwegians at Stamford Bridge.', feedback_wrong: 'Incorrect. Ignoring the northern invasion would weaken his rule.', is_final: false },
        { id: 3, character_id: 1, scene_order: 3, narrative: 'Only days after victory in the north, Harold is told that William of Normandy has landed on the south coast.', question: 'What decision must Harold now make?', option_a: 'Rest his army before facing William', option_b: 'Force march south to confront William immediately', correct_option: 'B', feedback_correct: 'Correct. Harold rushed south, leaving his army exhausted.', feedback_wrong: 'Incorrect. Harold did not delay his response.', is_final: false },
        { id: 4, character_id: 1, scene_order: 4, narrative: 'Harold’s army meets William’s forces at the Battle of Hastings. The fighting is fierce and lasts all day.', question: 'What is the outcome of the battle?', option_a: 'Harold defeats William and secures his crown', option_b: 'Harold is killed and William claims the throne', correct_option: 'B', feedback_correct: 'Correct. Harold was killed, and William became King of England.', feedback_wrong: 'Incorrect. Harold did not survive the battle.', is_final: true },
    ];

    const nextScene = simulatedScenes.find(s => s.scene_order === order);
    
    if (nextScene) {
        renderScene(nextScene);
    } else {
        alert("Error: Scene not found or sequence finished.");
        window.location.href = 'home.html'; 
    }
}


// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Start the game by loading the first scene (Scene Order 1)
    loadSceneByOrder(1); 
});