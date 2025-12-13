const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const loginForm = document.getElementById('loginForm');
const output = document.getElementById('output');

// Login functionality
loginBtn.addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.message === "Logged in successfully") {
      output.textContent = "Welcome, " + username;
      loginForm.style.display = 'none';  // Hide login form after successful login
    } else {
      output.textContent = "Login failed!";
    }
  })
  .catch(err => {
    console.error(err);
    output.textContent = "Error logging in!";
  });
});

// Register functionality
registerBtn.addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  .then(response => response.json())
  .then(data => {
    output.textContent = data.message;
  })
  .catch(err => {
    console.error(err);
    output.textContent = "Error registering!";
  });
});

// Log out functionality
const logoutBtn = document.getElementById('logoutBtn'); // Assume there's a logout button
logoutBtn.addEventListener('click', () => {
  fetch('/logout', {
    method: 'POST',
  })
  .then(response => response.json())
  .then(data => {
    output.textContent = data.message;
    loginForm.style.display = 'block'; // Show login form on logout
  })
  .catch(err => {
    console.error(err);
    output.textContent = "Error logging out!";
  });
});
