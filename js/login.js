// =====================================
// Login
// =====================================

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(e) {

    e.preventDefault();

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

            alert("✅ Login Successful");

            window.location.href = "dashboard.html";

        } else {

            alert("❌ Invalid Email or Password");

        }

    })

    .catch(error => {

        console.error(error);

        alert("❌ Unable to connect to server.");

    });

});