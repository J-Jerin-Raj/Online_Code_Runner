"use strict";

let generatedOTP = null;
let otpStage = false;

const registerBtn = document.getElementById("registerBtn");
const otpSection = document.getElementById("otpSection");
const otpInput = document.getElementById("otpInput");

registerBtn.onclick = async () => {
  const user = document.getElementById("emailUser").value;
  const domain = document.getElementById("emailDomain").value;
  const password = document.getElementById("password").value;
  const email = user + domain;

  if (!otpStage) {
    generatedOTP = Math.floor(100000 + Math.random() * 900000);
    alert("OTP has been sent to your email (simulation)");
    otpSection.style.display = "block";
    registerBtn.textContent = "Verify OTP";
    otpStage = true;
    return;
  }

  const entered = otpInput.value.trim();
  if (entered !== String(generatedOTP)) {
    alert("Invalid OTP");
    return;
  }

  
  const res = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  alert(data.message);

  if (res.ok) {
    window.location.href = "login.html";
  }
};

