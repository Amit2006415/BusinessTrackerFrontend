// ==========================================
// Register Account
// ==========================================

document.addEventListener("DOMContentLoaded", function() {

    const registerForm = document.getElementById("registerForm");

    if (!registerForm) return;

    registerForm.addEventListener("submit", function(e) {

        e.preventDefault();

        const registerBtn = document.getElementById("registerBtn");
        const registerText = document.getElementById("registerText");
        const registerSpinner = document.getElementById("registerSpinner");

        // ==========================================
        // Show Loading
        // ==========================================

        registerBtn.disabled = true;
        registerText.innerHTML = "Creating Account...";
        registerSpinner.classList.remove("d-none");

        // ==========================================
        // Get Form Values
        // ==========================================

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const mobile = document.getElementById("mobile").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();
        const securityQuestion = document.getElementById("securityQuestion").value;
        const securityAnswer = document.getElementById("securityAnswer").value.trim();

        // ==========================================
        // Validation
        // ==========================================

        if (
            fullName === "" ||
            email === "" ||
            mobile === "" ||
            password === "" ||
            confirmPassword === "" ||
            securityQuestion === "" ||
            securityAnswer === ""
        ) {

            showToast("Please fill all fields", "warning");

            registerBtn.disabled = false;
            registerText.innerHTML = "Create Account";
            registerSpinner.classList.add("d-none");

            return;
        }

        if (password !== confirmPassword) {

            showToast("Passwords do not match", "error");

            registerBtn.disabled = false;
            registerText.innerHTML = "Create Account";
            registerSpinner.classList.add("d-none");

            return;
        }

        // ==========================================
        // Create Object
        // ==========================================

        const admin = {

            fullName: fullName,
            email: email,
            mobile: mobile,
            password: password,
            securityQuestion: securityQuestion,
            securityAnswer: securityAnswer

        };

        // ==========================================
        // API Call
        // ==========================================

        fetch(API_BASE_URL.replace("/api", "") + "/api/admin/register", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(admin)

        })

        .then(async(response) => {

            const message = await response.text();

            if (!response.ok) {
                throw new Error(message);
            }

            return message;

        })

        .then(() => {

            showToast("✅ Account Created Successfully!", "success");

            setTimeout(() => {

                window.location.href = "index.html";

            }, 1500);

        })

        .catch((error) => {

            console.error(error);

            showToast(error.message, "error");

        })

        .finally(() => {

            registerBtn.disabled = false;
            registerText.innerHTML = "Create Account";
            registerSpinner.classList.add("d-none");

        });

    });

});