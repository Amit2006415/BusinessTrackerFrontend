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

    .then(response => {

        if (!response.ok) {
            throw new Error("Failed to load income");
        }

        return response.json();

    })

    .then(data => {

        document.getElementById("income").innerHTML = "₹ " + data;

    })

    .catch(error => {

        console.error(error);

        showToast("Unable to load Income", "error");

    });

}

// ==========================================
// Load Total Expense
// ==========================================

function loadExpense() {

    fetch(API_BASE_URL + "/expenses/total")

    .then(response => {

        if (!response.ok) {
            throw new Error("Failed to load expense");
        }

        return response.json();

    })

    .then(data => {

        document.getElementById("expense").innerHTML = "₹ " + data;

    })

    .catch(error => {

        console.error(error);

        showToast("Unable to load Expense", "error");

    });

}

// ==========================================
// Load Total Due Amount
// ==========================================

function loadDueAmount() {

    fetch(API_BASE_URL + "/customers/due/total")

    .then(response => {

        if (!response.ok) {
            throw new Error("Failed to load due amount");
        }

        return response.json();

    })

    .then(data => {

        document.getElementById("dueAmount").innerHTML = "₹ " + data;

    })

    .catch(error => {

        console.error(error);

        showToast("Unable to load Due Amount", "error");

    });

}

// ==========================================
// Load Total Profit
// ==========================================

function loadProfit() {

    fetch(API_BASE_URL + "/profit/total")

    .then(response => {

        if (!response.ok) {
            throw new Error("Failed to load profit");
        }

        return response.json();

    })

    .then(data => {

        document.getElementById("profit").innerHTML = "₹ " + data;

    })

    .catch(error => {

        console.error(error);

        showToast("Unable to load Profit", "error");

    });

}

// ==========================================
// Load Reports
// ==========================================

document.addEventListener("DOMContentLoaded", function() {

    loadIncome();
    loadExpense();
    loadDueAmount();
    loadProfit();

});