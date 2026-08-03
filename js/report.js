// ==========================================
// Check Login
// ==========================================

if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "index.html";
}

// ==========================================
// Load Total Income
// ==========================================

function loadIncome() {

    fetch(API_BASE_URL + "/income/total")

    .then(response => response.json())

    .then(data => {

        document.getElementById("income").innerHTML = "₹ " + data;

    })

    .catch(error => {

        console.error("Income Error :", error);

        showToast("Unable to load Income", "error");

    });

}

// ==========================================
// Load Total Expense
// ==========================================

function loadExpense() {

    fetch(API_BASE_URL + "/expenses/total")

    .then(response => response.json())

    .then(data => {

        document.getElementById("expense").innerHTML = "₹ " + data;

    })

    .catch(error => {

        console.error("Expense Error :", error);

        showToast("Unable to load Expense", "error");

    });

}

// ==========================================
// Load Total Profit
// ==========================================

function loadProfit() {

    fetch(API_BASE_URL + "/profit/total")

    .then(response => response.json())

    .then(data => {

        document.getElementById("profit").innerHTML = "₹ " + data;

    })

    .catch(error => {

        console.error("Profit Error :", error);

        showToast("Unable to load Profit", "error");

    });

}

// ==========================================
// Load Reports
// ==========================================

loadIncome();
loadExpense();
loadProfit();