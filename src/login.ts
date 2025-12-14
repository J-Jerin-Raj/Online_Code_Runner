function generateSessionId(): string {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
}

const createBtn = document.getElementById('createSession') as HTMLButtonElement;
const loginBtn  = document.getElementById('loginBtn') as HTMLButtonElement;
const sessionInput = document.getElementById('sessionInput') as HTMLInputElement;
const newSession = document.getElementById('newSession') as HTMLElement;

if (createBtn && newSession && sessionInput) {
  createBtn.onclick = () => {
    const id = generateSessionId();
    localStorage.setItem(`session_${id}`, JSON.stringify({ users: 0 }));
    newSession.textContent = id;
    sessionInput.value = id;
  };
}

if (loginBtn && sessionInput) {
  loginBtn.onclick = () => {
    const sessionId = sessionInput.value.trim();
    if (!sessionId) {
      alert('Enter a session ID');
      return;
    }

    const key = `session_${sessionId}`;
    const stored = localStorage.getItem(key);
    if (!stored) {
      alert('Invalid session ID');
      return;
    }

    const session = JSON.parse(stored) as { users: number };
    if (session.users >= 2) {
      alert('Session is full (max 2 users)');
      return;
    }

    session.users++;
    localStorage.setItem(key, JSON.stringify(session));

    alert(`Login successful. Joined session ${sessionId}`);
    window.location.href = '/CodingIDE.html';
  };
}