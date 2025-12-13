document.addEventListener("DOMContentLoaded", () => {

    const loginButton = document.querySelector(".btn-primary");

    const emailInput = document.querySelector(".email-group input");
    const domainSelect = document.querySelector(".email-group select");
    const passwordInput = document.querySelector('.form-group input[type="password"]');

    loginButton.addEventListener("click", (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const domain = domainSelect.value;
        const password = passwordInput.value.trim();

        // ---- Basic validation ----
        if (email === "") {
            alert("Please enter your email username");
            emailInput.focus();
            return;
        }

        if (!domain) {
            alert("Please select an email domain");
            domainSelect.focus();
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters");
            passwordInput.focus();
            return;
        }

        // ---- Combine email + domain ----
        const fullEmail = email + domain;

        console.log("Login attempt:");
        console.log("Email:", fullEmail);
        console.log("Password:", password);

        // ---- Fake success (replace with backend later) ----
        alert(`Welcome ${fullEmail}!`);

        // Redirect
        window.location.href = "CodingIDE1.html";
    });

    // ---- UX: prevent spaces in username ----
    emailInput.addEventListener("input", () => {
        emailInput.value = emailInput.value.replace(/\s/g, "");
    });

});

