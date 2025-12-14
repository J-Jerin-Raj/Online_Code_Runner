document.addEventListener("DOMContentLoaded", () => {

 
  emailjs.init("8BgIkpNFSn6N9zrWX"); 

  const emailInput = document.getElementById("emailUser");
  const domainSelect = document.getElementById("emailDomain");
  const passwordInput = document.getElementById("password");
  const otpSection = document.getElementById("otpSection");
  const otpInput = document.getElementById("otpInput");
  const registerBtn = document.getElementById("registerBtn");

  let generatedOTP = "";
  let otpStage = false;

  registerBtn.addEventListener("click", () => {

   
    if (!otpStage) {
      const emailUser = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (!emailUser) {
        alert("Enter email username");
        return;
      }

      if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
      }

      const fullEmail = emailUser + domainSelect.value;

      
      generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();

      
      emailjs.send(
         "service_ymq7kqi",
        "template_snbgp5z",    
        {
          to_email: fullEmail,             
          passcode: generatedOTP,          
        }
      ).then(() => {

        alert("OTP sent to your email ");

        otpSection.style.display = "block";
        registerBtn.textContent = "Verify OTP";

        emailInput.disabled = true;
        domainSelect.disabled = true;
        passwordInput.disabled = true;

        otpStage = true;

      }).catch((error) => {
        console.error("EmailJS error:", error);
        alert("Failed to send OTP ");
      });

      return;
    }

    
    if (otpInput.value !== generatedOTP) {
      alert("Invalid OTP ");
      return;
    }

    alert("Registration successful 🎉");

    
    localStorage.setItem("user_email", emailInput.value + domainSelect.value);
    localStorage.setItem("user_password", passwordInput.value);

    window.location.href = "login.html";

  });

  // Prevent spaces in email username
  emailInput.addEventListener("input", () => {
    emailInput.value = emailInput.value.replace(/\s/g, "");
  });

});

