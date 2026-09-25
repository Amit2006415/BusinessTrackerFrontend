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
    // API URL
    // ==========================================

    const API_BASE_URL =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ?
        "http://localhost:8080" :
        "https://business-tracker-backend-d7gt.onrender.com";


    // ==========================================
    // Show / Hide Password
    // ==========================================

    togglePassword.addEventListener("click", function() {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            this.innerHTML =
                '<i class="bi bi-eye-slash-fill"></i>';

        } else {

            passwordInput.type = "password";

            this.innerHTML =
                '<i class="bi bi-eye-fill"></i>';

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

    loginForm.addEventListener("submit", async function(e) {

        e.preventDefault();

        loginBtn.disabled = true;

        loginText.innerHTML = "Logging In...";

        loginSpinner.classList.remove("d-none");


        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();


        // ==========================================
        // Validation
        // ==========================================

        if (!email || !password) {

            alert("Please enter email and password.");

            loginBtn.disabled = false;
            loginText.innerHTML = "Login";
            loginSpinner.classList.add("d-none");

            return;

        }


        try {

            const response = await fetch(
                `${API_BASE_URL}/api/login`, {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );


            const result = await response.text();


            // ==========================================
            // Successful Login
            // ==========================================

            if (response.ok) {

                localStorage.setItem(
                    "isLoggedIn",
                    "true"
                );

                localStorage.setItem(
                    "adminEmail",
                    email
                );


                // Remember Me

                if (rememberCheckbox.checked) {

                    localStorage.setItem(
                        "rememberEmail",
                        email
                    );

                } else {

                    localStorage.removeItem(
                        "rememberEmail"
                    );

                }


                loginText.innerHTML =
                    "Login Successful ✓";


                setTimeout(function() {

                    window.location.href =
                        "dashboard.html";

                }, 700);

            }


            // ==========================================
            // Login Failed
            // ==========================================
            else {

                alert(
                    result ||
                    "Invalid email or password."
                );

                loginBtn.disabled = false;

                loginText.innerHTML = "Login";

                loginSpinner.classList.add("d-none");

            }

        }


        // ==========================================
        // Connection Error
        // ==========================================
        catch (error) {

            console.error(
                "Login Error:",
                error
            );

            alert(
                "Cannot connect to the server. Please try again."
            );

            loginBtn.disabled = false;

            loginText.innerHTML = "Login";

            loginSpinner.classList.add("d-none");

        }

    });

});