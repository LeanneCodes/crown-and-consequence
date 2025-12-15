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

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("Login logic will be handled here.");
    // Temporarily Redirecting to home.html on success
    window.location.href = 'home.html';
});