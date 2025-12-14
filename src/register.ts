declare const emailjs: any;
document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('emailUser') as HTMLInputElement;
  const domainSelect = document.getElementById('emailDomain') as HTMLSelectElement;
  const passwordInput = document.getElementById('password') as HTMLInputElement;
  const otpSection = document.getElementById('otpSection') as HTMLDivElement;
  const otpInput = document.getElementById('otpInput') as HTMLInputElement;
  const registerBtn = document.getElementById('registerBtn') as HTMLButtonElement;
  emailjs.init('8BgIkpNFSn6N9zrWX');
  let generatedOTP = '';
  let otpStage = false;
  registerBtn.addEventListener('click', () => {
    if (!otpStage) {
      const emailUser = emailInput.value.trim();
      const password = passwordInput.value.trim();
      if (!emailUser) {
        alert('Enter email username');
        return;
      }
      if (password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
      }
      const fullEmail = emailUser + domainSelect.value;
      generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
      emailjs.send(
        'service_ymq7kqi',
        'template_snbgp5z',
        {
          to_email: fullEmail,
          passcode: generatedOTP,
        }
      )
      .then(() => {
        alert('OTP sent to your email');
        otpSection.style.display = 'block';
        registerBtn.textContent = 'Verify OTP';
        emailInput.disabled = true;
        domainSelect.disabled = true;
        passwordInput.disabled = true;
        otpStage = true;
      })
      .catch((err: unknown) => {
        console.error('EmailJS error:', err);
        alert('Failed to send OTP');
      });
      return;
    }
    if (otpInput.value !== generatedOTP) {
      alert('Invalid OTP');
      return;
    }
    alert('Registration successful 🎉');
    localStorage.setItem('user_email', emailInput.value + domainSelect.value);
    localStorage.setItem('user_password', passwordInput.value);
    window.location.href = 'login.html';
  });
  emailInput.addEventListener('input', () => {
    emailInput.value = emailInput.value.replace(/\s/g, '');
  });
});