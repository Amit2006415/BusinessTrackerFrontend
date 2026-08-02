const form = document.getElementById("changePasswordForm");

// Auto Fill Email
const savedEmail = localStorage.getItem("adminEmail");

document.getElementById("email").value = savedEmail || "";
document.getElementById("email").readOnly = true;

form.addEventListener("submit", function(e) {

    e.preventDefault();

    const data = {

        email: savedEmail,
        currentPassword: document.getElementById("currentPassword").value,
        newPassword: document.getElementById("newPassword").value

    };

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    if (data.newPassword !== confirmPassword) {

        alert("Passwords do not match.");

        return;

    }

    fetch("https://business-tracker-backend-d7gt.onrender.com/api/admin/change-password", {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(data)

    })

    .then(response => response.text())

    .then(result => {

        alert(result);

        if (result === "Password Changed Successfully") {

            window.location.href = "dashboard.html";

        }

    })

    .catch(error => {

        console.error(error);

        alert("Server Error");

    });

});