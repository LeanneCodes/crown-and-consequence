// document.addEventListener('DOMContentLoaded', () => {
//     const nextButton = document.getElementById('next-step-btn');
//     const text1 = document.getElementById('narration-text-1');
//     const text2 = document.getElementById('narration-text-2');
//     const optionButtons = document.getElementById('option-buttons');

//     // State 0: Initial load (Text 1 is visible, Text 2 and Options are hidden)
//     let gameState = 0;

//     nextButton.addEventListener('click', () => {
//         gameState++;

//         if (gameState === 1) {
//             // Step 1: Hide Text 1, Show Text 2 (The Question)
//             text1.classList.add('hidden');
            
//             // To animate the appearance, we use a delay:
//             setTimeout(() => {
//                 text2.classList.remove('hidden');
//                 // You could add a class here like 'fade-in' if you want a CSS animation
//             }, 50); 
            
//             // Update button text to signal the next action
//             nextButton.textContent = 'Show Options';
        
//         } else if (gameState === 2) {
//             // Step 2: Hide Next Button, Show Options
//             nextButton.classList.add('hidden');
//             optionButtons.classList.remove('hidden');
            
//             // Optional: Remove the 'question-title' class to make the text stay
//             // You might want to remove 'hidden' on Text 2 here if you hid it above.
//         }
//     });

//     // Optional: Add logic for when an option button is clicked
//     document.querySelectorAll('.option-btn').forEach(button => {
//         button.addEventListener('click', (event) => {
//             const choice = event.target.getAttribute('data-choice');
//             console.log('User selected choice:', choice);
//             // In a real game, you would send this choice to the server/controller here
//             // e.g., fetch('/api/next-scene', { method: 'POST', body: { choice: choice } });
//             alert(`You chose option ${choice}! Loading next scene...`);
//         });
//     });
// });