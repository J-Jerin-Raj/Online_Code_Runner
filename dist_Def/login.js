document.addEventListener("DOMContentLoaded", () => {

  const loginBtn = document.getElementById("loginBtn");
  const createSessionBtn = document.getElementById("createSession");
  const newSessionDiv = document.getElementById("newSession");

  function generateSessionId() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  createSessionBtn.addEventListener("click", () => {
    const id = generateSessionId();
    newSessionDiv.textContent = id;
    document.getElementById("sessionInput").value = id;
  });

  loginBtn.addEventListener("click", () => {

    const email =
      document.getElementById("emailUser").value +
      document.getElementById("emailDomain").value;

    const password = document.getElementById("password").value;
    const sessionId = document.getElementById("sessionInput").value.trim();

    if (!sessionId) {
      alert("Session ID required");
      return;
    }

    let sessions = JSON.parse(localStorage.getItem("sessions")) || {};
    sessions[sessionId] = sessions[sessionId] || [];

    if (!sessions[sessionId].includes(email)) {
      if (sessions[sessionId].length >= 2) {
        alert("Session full (2 users max)");
        return;
      }
      sessions[sessionId].push(email);
    }

    localStorage.setItem("sessions", JSON.stringify(sessions));

    if (
      email === localStorage.getItem("user_email") &&
      password === localStorage.getItem("user_password")
    ) {
      alert("Login successful 🚀");
      window.location.href = "CodingIDE.html";
    } else {
      alert("Invalid credentials");
    }
  });
});
