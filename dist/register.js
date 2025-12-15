const emailInput = document.getElementById("emailUser");
const domainSelect = document.getElementById("emailDomain");
const passwordInput = document.getElementById("password");
const otpInput = document.getElementById("otpInput");
const otpSection = document.getElementById("otpSection");
const registerBtn = document.getElementById("registerBtn");

let otpStage = false;
let registeredEmail = "";

registerBtn.onclick = async () => {
  try {
    
    const email = emailInput.value.trim() + domainSelect.value;
    const password = passwordInput.value.trim();

   
    if (!otpStage) {
      if (!emailInput.value.trim() || !password) {
        alert("Please enter both email and password");
        return;
      }

      if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
      }

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      registeredEmail = email;
      alert(data.message);
      otpSection.style.display = "block";
      registerBtn.textContent = "Verify OTP";
      otpStage = true;
      return;
    }

   
    const enteredOTP = otpInput.value.trim();
    if (!enteredOTP) {
      alert("Please enter the OTP");
      return;
    }

    if (enteredOTP.length !== 6) {
      alert("OTP must be 6 digits");
      return;
    }

    const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: registeredEmail, otp: enteredOTP })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "OTP verification failed");
      return;
    }

    alert(data.message);
    window.location.href = "login.html";

  } catch (err) {
    console.error("Error:", err);
    console.error("Error message:", err.message);
    alert("Error: " + err.message + "\n\nMake sure:\n1. Backend is running (npm start)\n2. URL is correct (localhost:5000)\n3. Using Live Server to open HTML");
  }
};
