const params = new URLSearchParams(window.location.search);
const storyId = params.get("storyId");
const characterId = params.get("characterId");

if (!storyId || !characterId) {
  alert("Missing story or character ID.");
  throw new Error("Missing storyId or characterId");
}

const titleEl = document.getElementById("scene-title");
const imageEl = document.getElementById("scene-image");
const narrativeEl = document.getElementById("scene-narrative");
const questionEl = document.getElementById("scene-question");
const optionAEl = document.getElementById("option-a");
const optionBEl = document.getElementById("option-b");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");

let currentSceneOrder = 1;
let score = 0;
scoreEl.textContent = score; // initialise score display
let currentScene = null;
let firstTry = true; // flag for scoring

// Load scene by order
async function loadScene(order) {
  try {
    const res = await fetch(`/api/stories/${storyId}/characters/${characterId}/scenes/${order}`);
    if (!res.ok) throw new Error("Scene not found");
    currentScene = await res.json();
    console.log(currentScene)
    // Reset firstTry for the new scene
    firstTry = true;

    // Display scene data
    titleEl.textContent = `The Battle of 1066 - Scene ${currentScene.scene_order}`;
    imageEl.src = currentScene.image || "https://via.placeholder.com/700x350";
    imageEl.alt = currentScene.character_name || "Scene Image";
    narrativeEl.textContent = currentScene.narrative;
    questionEl.textContent = currentScene.question;
    optionAEl.textContent = currentScene.option_a;
    optionBEl.textContent = currentScene.option_b;
    feedbackEl.textContent = "";
  narrativeEl.textContent = currentScene.narrative;
  } catch (err) {
    narrativeEl.textContent = "Error loading scene.";
    console.error(err);
  }
}
// Handle answer selection
function handleAnswer(selectedOption) {
  if (!currentScene) return;

  if (selectedOption === currentScene.correct_option) {
    feedbackEl.textContent = currentScene.feedback_correct || "Correct!";

    // Only award points if first try
    if (firstTry) {
      score += 5;
      scoreEl.textContent = score;
    }

    // Move to next scene after 1 second
    if (!currentScene.is_final) {
      currentSceneOrder++;
      setTimeout(() => loadScene(currentSceneOrder), 1000);
    } else {
    // Final Scene completed
    setTimeout(() => {
        // We MUST include characterId here for the strict check!
        window.location.href = `/end.html?score=${score}&storyId=${storyId}&characterId=${characterId}`;
    }, 500);
}
  } else {
    feedbackEl.textContent = currentScene.feedback_wrong || "Wrong! Try again.";
    firstTry = false; // mark that user has failed first attempt
  }
}

optionAEl.addEventListener("click", () => handleAnswer("A"));
optionBEl.addEventListener("click", () => handleAnswer("B"));

// Load first scene
loadScene(currentSceneOrder);