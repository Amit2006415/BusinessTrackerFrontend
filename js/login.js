// =====================================
// Wait Until Page Loads
// =====================================

document.addEventListener("DOMContentLoaded", function() {

    // =====================================
    // LOGIN
    // =====================================

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", function(e) {

            e.preventDefault();

            const loginBtn = document.getElementById("loginBtn");
            const loginText = document.getElementById("loginText");
            const loginSpinner = document.getElementById("loginSpinner");

            loginBtn.disabled = true;
            loginText.innerHTML = "Logging in...";
            loginSpinner.classList.remove("d-none");

            const admin = {

                email: document.getElementById("email").value.trim(),
                password: document.getElementById("password").value

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

                if (result.trim() === "Login Successful") {

                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("adminEmail", admin.email);

                    showToast("Login Successful", "success");

                    setTimeout(() => {

                        window.location.href = "dashboard.html";

                    }, 1000);

                } else {

                    showToast(result, "error");

                    loginBtn.disabled = false;
                    loginText.innerHTML = "Login";
                    loginSpinner.classList.add("d-none");

                }

            })

            .catch(error => {

                console.error(error);

                showToast("Unable to connect to server", "error");

                loginBtn.disabled = false;
                loginText.innerHTML = "Login";
                loginSpinner.classList.add("d-none");

            });

        });

    }

    // =====================================
    // SHOW PASSWORD
    // =====================================

    const togglePassword = document.getElementById("togglePassword");
    const password = document.getElementById("password");

    if (togglePassword) {

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
    // LOAD SECURITY QUESTION
    // =====================================

    const loadQuestionBtn = document.getElementById("loadQuestionBtn");

    if (loadQuestionBtn) {

        loadQuestionBtn.addEventListener("click", function() {

            const email = document.getElementById("forgotEmail").value.trim();

            if (email === "") {

                showToast("Enter Email First", "warning");
                return;

            }

            fetch(API_BASE_URL + "/admin/security-question/" + encodeURIComponent(email))

            .then(response => response.text())

            .then(question => {

                if (question === "Email Not Found") {

                    showToast(question, "error");
                    return;

                }

                document.getElementById("securityQuestion").value = question;

            })

            .catch(error => {

                console.error(error);
                showToast("Unable to load security question", "error");

            });

        });

    }

    // =====================================
    // VERIFY SECURITY ANSWER
    // =====================================

    const verifyBtn = document.getElementById("verifyAnswerBtn");

    if (verifyBtn) {

        verifyBtn.addEventListener("click", function() {

            const email = document.getElementById("forgotEmail").value.trim();

            const answer = document.getElementById("securityAnswer").value.trim();

            if (answer === "") {

                showToast("Enter Security Answer", "warning");
                return;

            }

            fetch(API_BASE_URL + "/admin/verify-answer?email=" +

                encodeURIComponent(email) +

                "&answer=" +

                encodeURIComponent(answer),

                {

                    method: "POST"

                })

            .then(response => response.text())

            .then(result => {

                if (result === "Verified") {

                    showToast("Answer Verified", "success");

                    document.getElementById("newPassword").disabled = false;
                    document.getElementById("confirmPassword").disabled = false;
                    document.getElementById("updatePasswordBtn").disabled = false;

                } else {

                    showToast(result, "error");

                }

            })

            .catch(error => {

                console.error(error);

                showToast("Verification Failed", "error");

            });

        });

    }

    // =====================================
    // UPDATE PASSWORD
    // =====================================

    const updateBtn = document.getElementById("updatePasswordBtn");

    if (updateBtn) {

        updateBtn.addEventListener("click", function() {

            const email = document.getElementById("forgotEmail").value.trim();
            const newPassword = document.getElementById("newPassword").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            if (newPassword === "" || confirmPassword === "") {

                showToast("Fill Password Fields", "warning");
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

            .then(response => response.text())

            .then(result => {

                showToast(result, "success");

                setTimeout(() => {

                    const modal = bootstrap.Modal.getInstance(
                        document.getElementById("forgotPasswordModal")
                    );

                    if (modal) {
                        modal.hide();
                    }

                }, 1000);

            })

            .catch(error => {

                console.error(error);

                showToast("Unable to Update Password", "error");

            });

        });

    }

});