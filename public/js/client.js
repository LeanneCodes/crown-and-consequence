const LOGIN_API_URL = "/api/auth/login";
const SIGNUP_API_URL = "/api/auth/signup";

// LOGIN form submission
document.getElementById("login-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();

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

    if (!response.ok) {
      alert(data.error || "Error logging in");
      return;
    }

    alert("Logged in successfully!");
    window.location.href = "dashboard.html";

  } catch (error) {
    alert("Something went wrong with signing in.");
  }
});

// SIGNUP form submission
document.getElementById("signup-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();

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

    if (!response.ok) {
      alert(data.error || "Error creating an account");
      return;
    }

    alert("Account created!");
    window.location.href = "index.html";

  } catch (error) {
    alert("Something went wrong with creating an account.");
  }
});
