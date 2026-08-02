// ===========================
// Load Income
// ===========================

fetch(API_BASE_URL + "/income/total")
    .then(response => response.json())
    .then(data => {

        document.getElementById("income").innerHTML = "₹ " + data;

    })
    .catch(error => {
        console.error("Income Error:", error);
    });

// ===========================
// Load Expense
// ===========================

fetch(API_BASE_URL + "/expenses/total")
    .then(response => response.json())
    .then(data => {

        document.getElementById("expense").innerHTML = "₹ " + data;

    })
    .catch(error => {
        console.error("Expense Error:", error);
    });

// ===========================
// Load Profit
// ===========================

fetch(API_BASE_URL + "/profit/total")
    .then(response => response.json())
    .then(data => {

        document.getElementById("profit").innerHTML = "₹ " + data;

    })
    .catch(error => {
        console.error("Profit Error:", error);
    });