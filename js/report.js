// ==========================================
// Check Login
// ==========================================

if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "index.html";
}

// ==========================================
// Load Report Data
// ==========================================

function loadReport() {

    fetch(API_BASE_URL + "/dashboard")

    .then(response => {

        if (!response.ok) {
            throw new Error("Failed to load report");
        }

        return response.json();

    })

    .then(data => {

        document.getElementById("income").innerHTML =
            "₹ " + data.totalIncome.toFixed(2);

        document.getElementById("expense").innerHTML =
            "₹ " + data.totalExpense.toFixed(2);

        document.getElementById("dueAmount").innerHTML =
            "₹ " + data.totalDueAmount.toFixed(2);

        document.getElementById("currentProfit").innerHTML =
            "₹ " + data.currentProfit.toFixed(2);

        document.getElementById("profit").innerHTML =
            "₹ " + data.totalProfit.toFixed(2);

    })

    .catch(error => {

        console.error(error);

        showToast("Unable to load Report", "error");

    });

}

// ==========================================
// Logout
// ==========================================

function logout() {

    if (confirm("Are you sure you want to logout?")) {

        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("adminEmail");
        localStorage.removeItem("language");

        window.location.href = "index.html";

    }

}

// ==========================================
// Load Reports
// ==========================================

document.addEventListener("DOMContentLoaded", function() {

    loadReport();

});