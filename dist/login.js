"use strict";

function generateSessionId() {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
}

const createBtn = document.getElementById("createSession");
const loginBtn = document.getElementById("loginBtn");
const sessionInput = document.getElementById("sessionInput");
const newSession = document.getElementById("newSession");


if (createBtn && newSession && sessionInput) {
  createBtn.onclick = () => {
    const id = generateSessionId();
    localStorage.setItem(`session_${id}`, JSON.stringify({ users: 0 }));
    newSession.textContent = id;
    sessionInput.value = id;
  };
}


if (loginBtn && sessionInput) {
  loginBtn.onclick = async () => {
    const user = document.getElementById("emailUser").value;
    const domain = document.getElementById("emailDomain").value;
    const password = document.getElementById("password").value;
    const email = user + domain;

    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.message);
      return;
    }

   
    const sessionId = sessionInput.value.trim();
    if (!sessionId) {
      alert("Enter a session ID");
      return;
    }

    const key = `session_${sessionId}`;
    const stored = localStorage.getItem(key);
    if (!stored) {
      alert("Invalid session ID");
      return;
    }

    const session = JSON.parse(stored);
    if (session.users >= 2) {
      alert("Session is full (max 2 users)");
      return;
    }

    session.users++;
    localStorage.setItem(key, JSON.stringify(session));

    alert(`Login successful. Joined session ${sessionId}`);
    window.location.href = "CodingIDE.html";
  };
}
