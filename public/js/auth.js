function toggleAuth() {
    const loginBox = document.getElementById('login-box');
    const signupBox = document.getElementById('signup-box');

    if (loginBox.style.display === 'none') {
        loginBox.style.display = 'block';
        signupBox.style.display = 'none';
        document.title = "Login | Crown And Consequence";
    } else {
        loginBox.style.display = 'none';
        signupBox.style.display = 'block';
        document.title = "Sign Up | Crown And Consequence";
    }
}

const loginForm = document.getElementById('login-form');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("Login logic will be handled here.");
    // Temporarily redirect to home.html on success
  });
}


module.exports = { toggleAuth };