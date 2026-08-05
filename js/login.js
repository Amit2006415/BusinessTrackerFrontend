// =====================================
// Wait until page is loaded
// =====================================

document.addEventListener("DOMContentLoaded", function() {

    // =====================================
    // Login
    // =====================================

    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function(e) {

        e.preventDefault();

        const loginBtn = document.getElementById("loginBtn");
        const loginText = document.getElementById("loginText");
        const loginSpinner = document.getElementById("loginSpinner");

        // Show loading
        loginBtn.disabled = true;
        loginText.innerHTML = "Logging in...";
        loginSpinner.classList.remove("d-none");

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const admin = {
            email: email,
            password: password
        };

        fetch(API_BASE_URL.replace("/api", "") + "/api/admin/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(admin)

        })

        .then(response => response.text())

        .then(result => {

            if (result === "Login Successful") {

                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("adminEmail", email);

                window.location.href = "dashboard.html";

            } else {

                showToast("Invalid Email or Password", "error");

                loginBtn.disabled = false;
                loginText.innerHTML = "Login";
                loginSpinner.classList.add("d-none");

            }

        })

        .catch(error => {

            console.error(error);

            showToast("Cannot connect to Spring Boot Server", "error");

            loginBtn.disabled = false;
            loginText.innerHTML = "Login";
            loginSpinner.classList.add("d-none");

        });

    });

    // =====================================
    // Show / Hide Password
    // =====================================

    const togglePassword = document.getElementById("togglePassword");
    const password = document.getElementById("password");

    if (togglePassword && password) {

        togglePassword.addEventListener("click", function() {

            if (password.type === "password") {

                password.type = "text";
                this.innerHTML = '<i class="bi bi-eye-slash-fill"></i>';

            } else {

                password.type = "password";
                this.innerHTML = '<i class="bi bi-eye-fill"></i>';

            }

        });

    }

    // =====================================
    // Forgot Password
    // =====================================

    const updateBtn = document.getElementById("updatePasswordBtn");

    if (updateBtn) {

        updateBtn.addEventListener("click", function() {

            const email = document.getElementById("forgotEmail").value.trim();
            const newPassword = document.getElementById("newPassword").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            if (email === "" || newPassword === "" || confirmPassword === "") {

                showToast("Please fill all fields", "warning");
                return;

            }

            if (newPassword !== confirmPassword) {

                showToast("Passwords do not match", "error");
                return;

            }

            fetch(API_BASE_URL + "/users/change-password", {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    email: email,
                    newPassword: newPassword

                })

            })

            .then(response => response.text())

            .then(result => {

                if (result === "Password Updated Successfully") {

                    showToast("Password Updated Successfully");

                    document.getElementById("forgotEmail").value = "";
                    document.getElementById("newPassword").value = "";
                    document.getElementById("confirmPassword").value = "";

                    const modalElement = document.getElementById("forgotPasswordModal");

                    const modal = bootstrap.Modal.getInstance(modalElement);

                    if (modal) {
                        modal.hide();
                    }

                } else {

                    showToast(result, "error");

                }

            })

            .catch(error => {

                console.error(error);

                showToast("Unable to update password", "error");

            });

        });

    }

});