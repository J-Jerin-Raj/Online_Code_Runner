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

    // ✅ ADDITION: prevent double clicks
    loginBtn.disabled = true;

    const email =
      document.getElementById("emailUser").value +
      document.getElementById("emailDomain").value;

    const password = document.getElementById("password").value;
    const sessionId = document.getElementById("sessionInput").value.trim();

    // ✅ ADDITION: normalize session id
    const normalizedSessionId = sessionId.toUpperCase();

    if (!normalizedSessionId) {
      alert("Session ID required");
      loginBtn.disabled = false;
      return;
    }

    // 🔹 EXISTING SESSION STORAGE (UNCHANGED LOGIC)
    let sessions = JSON.parse(localStorage.getItem("sessions")) || {};
    sessions[normalizedSessionId] = sessions[normalizedSessionId] || [];

    if (!sessions[normalizedSessionId].includes(email)) {
      if (sessions[normalizedSessionId].length >= 2) {
        alert("Session full (2 users max)");
        loginBtn.disabled = false;
        return;
      }
      sessions[normalizedSessionId].push(email);
    }

    localStorage.setItem("sessions", JSON.stringify(sessions));

    // 🔹 LOGIN CHECK (UNCHANGED)
    if (
      email === localStorage.getItem("user_email") &&
      password === localStorage.getItem("user_password")
    ) {
      alert("Login successful 🚀");

      // ✅ ADDITION 1: SAVE SESSION ID
      localStorage.setItem("currentSession", normalizedSessionId);

      // ✅ ADDITION 2: PASS SESSION ID TO COMPILER
      window.location.href = `CodingIDE1.html?session=${normalizedSessionId}`;

      // ✅ ADDITION 3: SAFETY REDIRECT
      setTimeout(() => {
        if (!window.location.href.includes("CodingIDE1.html")) {
          window.location.href = `CodingIDE1.html?session=${normalizedSessionId}`;
        }
      }, 100);

    } else {
      alert("Invalid credentials");

      // ✅ ADDITION: cleanup wrongly-added session user
      sessions[normalizedSessionId] =
        sessions[normalizedSessionId].filter(e => e !== email);
      localStorage.setItem("sessions", JSON.stringify(sessions));

      loginBtn.disabled = false;
    }
  });
});
