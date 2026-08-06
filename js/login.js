document.addEventListener("DOMContentLoaded", function() {

    // ==========================================
    // Elements
    // ==========================================

    const loginForm = document.getElementById("loginForm");
    const loginBtn = document.getElementById("loginBtn");
    const loginText = document.getElementById("loginText");
    const loginSpinner = document.getElementById("loginSpinner");

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const rememberCheckbox = document.getElementById("remember");

    const togglePassword = document.getElementById("togglePassword");

    // ==========================================
    // Show / Hide Password
    // ==========================================

    togglePassword.addEventListener("click", function() {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";
            this.innerHTML = '<i class="bi bi-eye-slash-fill"></i>';

        } else {

            passwordInput.type = "password";
            this.innerHTML = '<i class="bi bi-eye-fill"></i>';

        }

    });

    // ==========================================
    // Remember Me
    // ==========================================

    const savedEmail = localStorage.getItem("rememberEmail");

    if (savedEmail) {

        emailInput.value = savedEmail;
        rememberCheckbox.checked = true;

    }

    // ==========================================
    // Login
    // ==========================================

    loginForm.addEventListener("submit", function(e) {

        e.preventDefault();

        loginBtn.disabled = true;
        loginText.innerHTML = "Logging In...";
        loginSpinner.classList.remove("d-none");

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        fetch("http://localhost:8080/api/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: email,
                password: password
            })

        })

        .then(async response => {

            const result = await response.text();

            if (response.ok) {

                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("adminEmail", email);

                if (rememberCheckbox.checked) {

                    localStorage.setItem("rememberEmail", email);

                } else {

                    localStorage.removeItem("rememberEmail");

                }

                loginText.innerHTML = "Login Successful ✓";

                setTimeout(() => {

                    window.location.href = "dashboard.html";

                }, 700);

            } else {

                alert(result);

                loginBtn.disabled = false;
                loginText.innerHTML = "Login";
                loginSpinner.classList.add("d-none");

            }

        })

        .catch(error => {

            console.error(error);

            alert("Cannot connect to Spring Boot Server");

            loginBtn.disabled = false;
            loginText.innerHTML = "Login";
            loginSpinner.classList.add("d-none");

        });

    });

});