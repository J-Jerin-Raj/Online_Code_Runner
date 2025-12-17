document.addEventListener('DOMContentLoaded', () => {
  // DOM elements – cast to the appropriate HTML element type
  const loginBtn = document.getElementById('loginBtn') as HTMLButtonElement;
  const createSessionBtn = document.getElementById('createSession') as HTMLButtonElement;
  const newSessionDiv = document.getElementById('newSession') as HTMLDivElement;
  const sessionInput = document.getElementById('sessionInput') as HTMLInputElement;
  const emailUser = document.getElementById('emailUser') as HTMLInputElement;
  const emailDomain = document.getElementById('emailDomain') as HTMLInputElement;
  const passwordInput = document.getElementById('password') as HTMLInputElement;

  // Helper – generate a short random session ID
  function generateSessionId(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  createSessionBtn.addEventListener('click', () => {
    const id = generateSessionId();
    newSessionDiv.textContent = id;
    sessionInput.value = id;
  });

  loginBtn.addEventListener('click', () => {
    const email = emailUser.value + emailDomain.value;
    const password = passwordInput.value;
    const sessionId = sessionInput.value.trim();

    if (!sessionId) {
      alert('Session ID required');
      return;
    }

    // Load existing sessions from localStorage (or start empty)
    const stored = localStorage.getItem('sessions');
    const sessions: Record<string, string[]> = stored ? JSON.parse(stored) : {};

    if (!sessions[sessionId]) {
      sessions[sessionId] = [];
    }

    if (!sessions[sessionId].includes(email)) {
      if (sessions[sessionId].length >= 2) {
        alert('Session full (2 users max)');
        return;
      }
      sessions[sessionId].push(email);
    }

    localStorage.setItem('sessions', JSON.stringify(sessions));

    // Simple credential check – in a real app you’d store hashed passwords securely
    const savedEmail = localStorage.getItem('user_email');
    const savedPassword = localStorage.getItem('user_password');

    if (email === savedEmail && password === savedPassword) {
      alert('Login successful 🚀');
      window.location.href = 'CodingIDE.html';
    } else {
      alert('Invalid credentials');
    }
  });
});