// end.js

document.addEventListener('DOMContentLoaded', () => {
    const scoreDisplay = document.getElementById('final-score-display');
    
    // 1. Retrieve the score from localStorage
    const finalScore = localStorage.getItem('finalGameScore');

    if (finalScore !== null) {
        // 2. Display the retrieved score
        scoreDisplay.innerHTML = `<strong>Total Correct Answers:</strong> <span style="font-size: 1.5rem; color: #7B1E3A;">${finalScore}</span>`;
        
        // 3. Clean up localStorage (optional, but good practice)
        localStorage.removeItem('finalGameScore');
    } else {
        // Handle case where score is missing (e.g., user jumped straight to the page)
        scoreDisplay.textContent = 'Score data not found. Please complete a story.';
    }
});