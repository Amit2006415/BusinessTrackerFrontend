// =====================================
// Wait until page is loaded
// =====================================

document.addEventListener("DOMContentLoaded", function() {

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
    // Show / Hide Confirm Password
    // =====================================

    const toggleConfirmPassword =
        document.getElementById("toggleConfirmPassword");

    const confirmPassword =
        document.getElementById("confirmPassword");

    if (toggleConfirmPassword && confirmPassword) {

        toggleConfirmPassword.addEventListener("click", function() {

            if (confirmPassword.type === "password") {

                confirmPassword.type = "text";
                this.innerHTML = '<i class="bi bi-eye-slash-fill"></i>';

            } else {

                confirmPassword.type = "password";
                this.innerHTML = '<i class="bi bi-eye-fill"></i>';

            }

        });

    }

    // =====================================
    // Register User
    // =====================================

    const registerForm = document.getElementById("registerForm");

    if (registerForm) {

        registerForm.addEventListener("submit", function(e) {

            e.preventDefault();

            const user = {

                name: document.getElementById("name").value.trim(),

                email: document.getElementById("email").value.trim(),

                phone: document.getElementById("phone").value.trim(),

                password: document.getElementById("password").value,

                confirmPassword: document.getElementById("confirmPassword").value

            };

            fetch(API_BASE_URL + "/users/register", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(user)

            })

            .then(response => response.text())

            .then(result => {

                if (result === "Registration Successful") {

                    showToast("Registration Successful");

                    setTimeout(function() {

                        window.location.href = "index.html";

                    }, 1500);

                } else {

                    showToast(result, "error");

                }

            })

            .catch(error => {

                console.error(error);

                showToast("Unable to connect to server", "error");

            });

        });

    }

});