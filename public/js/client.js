const LOGIN_API_URL = "/api/auth/login";
const SIGNUP_API_URL = "/api/auth/signup";

// Login form submission
const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Remove previous message if it exists
    const oldMsg = loginForm.querySelector("p");
    if (oldMsg) {
        oldMsg.remove();
    }

    const loginData = {
        email: document.getElementById("login-email").value,
        password: document.getElementById("login-password").value
    };

    try {
      const response = await fetch(LOGIN_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();
      const message = document.createElement("p");

      if (!response.ok) {
        message.textContent = data.error || "Login failed";
        message.style.color = "red";
        loginForm.appendChild(message);
        return;
      }

      message.textContent = "Logged in successfully!";
      message.style.color = "green";
      loginForm.appendChild(message);

      setTimeout(() => {
        window.location.href = "home.html";
      }, 1000);

    } catch {
      const message = document.createElement("p");
      message.textContent = "Something went wrong";
      message.style.color = "red";
      loginForm.appendChild(message);
    }
  });
}

// Sign up form submission
const signupForm = document.getElementById("signup-form");

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Remove previous message if it exists
    const oldMsg = signupForm.querySelector("p");
    if (oldMsg) {
        oldMsg.remove();
    }

    const signupData = {
      username: document.getElementById("signup-name").value,
      email: document.getElementById("signup-email").value,
      password: document.getElementById("signup-password").value
    };

    try {
      const response = await fetch(SIGNUP_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData)
      });

      const data = await response.json();
      const message = document.createElement("p");

      if (!response.ok) {
        message.textContent = data.error || "Signup failed";
        message.style.color = "red";
        signupForm.appendChild(message);
        return;
      }

      message.textContent = "Account created successfully!";
      message.style.color = "green";
      signupForm.appendChild(message);

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);

    } catch {
      const message = document.createElement("p");
      message.textContent = "Something went wrong";
      message.style.color = "red";
      signupForm.appendChild(message);
    }
  });
}
