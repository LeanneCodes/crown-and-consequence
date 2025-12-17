const deleteBtn = document.querySelector('.danger-btn');
const confirmDiv = document.getElementById('delete-confirm');
const confirmBtn = document.getElementById('confirm-delete-btn');
const emailInput = document.getElementById('delete-email');
const passwordInput = document.getElementById('delete-password');

/* DELETE USER ACCOUNT */
// show the form
deleteBtn.addEventListener('click', () => {
  confirmDiv.style.display = 'block';
});

// disable button when both fields are empty
function toggleConfirmButton() {
  confirmBtn.disabled = !emailInput.value || !passwordInput.value;
}

emailInput.addEventListener('input', toggleConfirmButton);
passwordInput.addEventListener('input', toggleConfirmButton);

// delete user profile from database
confirmBtn.addEventListener('click', async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  const response = await fetch('/api/auth/me', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (response.ok) {
    window.location.href = '/signup';
  } else {
    alert(data.error);
  }
});
