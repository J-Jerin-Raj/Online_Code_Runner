let generatedOTP: number | null = null;
let otpStage = false;

const registerBtn = document.getElementById('registerBtn') as HTMLButtonElement;
const otpSection = document.getElementById('otpSection') as HTMLDivElement;
const otpInput = document.getElementById('otpInput') as HTMLInputElement;

if (registerBtn && otpSection && otpInput) {
  registerBtn.onclick = () => {
    if (!otpStage) {
      generatedOTP = Math.floor(100000 + Math.random() * 900000);

      alert('OTP has been sent to your email (simulation)');

      otpSection.style.display = 'block';
      registerBtn.textContent = 'Verify OTP';
      otpStage = true;
      return;
    }

    const entered = otpInput.value.trim();

    if (entered !== String(generatedOTP)) {
      alert('Invalid OTP');
      return;
    }

    alert('Registration successful!');
    window.location.href = 'login.html';
  };
}