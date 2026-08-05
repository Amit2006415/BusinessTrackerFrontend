// ==========================================
// Register Account
// ==========================================

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function(e) {

    e.preventDefault();

    const registerBtn = document.getElementById("registerBtn");
    const registerText = document.getElementById("registerText");
    const registerSpinner = document.getElementById("registerSpinner");

    // ==========================
    // Show Loading
    // ==========================

    registerBtn.disabled = true;
    registerText.innerHTML = "Creating Account...";
    registerSpinner.classList.remove("d-none");

    // ==========================
    // Get Form Values
    // ==========================

    const user = {

        fullName: document.getElementById("fullName").value.trim(),

        email: document.getElementById("email").value.trim(),

        mobile: document.getElementById("mobile").value.trim(),

        password: document.getElementById("password").value

    };

    // ==========================
    // Validation
    // ==========================

    if (
        user.fullName === "" ||
        user.email === "" ||
        user.mobile === "" ||
        user.password === ""
    ) {

        showToast("Please fill all fields", "warning");

        registerBtn.disabled = false;
        registerText.innerHTML = "Register";
        registerSpinner.classList.add("d-none");

        return;
    }

    // ==========================
    // API Call
    // ==========================

    fetch(API_BASE_URL.replace("/api", "") + "/api/admin/register", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(user)

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Registration Failed");

        }

        return response.text();

    })

    .then(result => {

        showToast("✅ Account Registered Successfully!", "success");

        setTimeout(() => {

            window.location.href = "index.html";

        }, 2000);

    })

    .catch(error => {

        console.error(error);

        showToast("❌ Registration Failed!", "error");

        registerBtn.disabled = false;
        registerText.innerHTML = "Register";
        registerSpinner.classList.add("d-none");

    });

});