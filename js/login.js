// =====================================
// Wait until page is loaded
// =====================================

document.addEventListener("DOMContentLoaded", function() {

    // =====================================
    // Login
    // =====================================

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", function(e) {

            e.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;

            fetch(API_BASE_URL + "/admin/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                })

            })

            .then(res => res.text())

            .then(result => {

                if (result === "Login Successful") {

                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("adminEmail", email);

                    showToast("Login Successful");

                    setTimeout(() => {

                        window.location.href = "dashboard.html";

                    }, 1000);

                } else {

                    showToast("Invalid Email or Password", "error");

                }

            })

            .catch(error => {

                console.error(error);

                showToast("Unable to connect to server", "error");

            });

        });

    }

    // =====================================
    // Show Password
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

            fetch(API_BASE_URL + "/admin/change-password", {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    email: email,
                    newPassword: newPassword

                })

            })

            .then(res => res.text())

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