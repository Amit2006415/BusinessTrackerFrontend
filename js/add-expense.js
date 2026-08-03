// =======================================
// Check Login
// =======================================

if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "index.html";
}

// =======================================
// Add Expense
// =======================================

const expenseForm = document.getElementById("expenseForm");

expenseForm.addEventListener("submit", function(e) {

    e.preventDefault();

    const expenseName = document.getElementById("expenseName").value.trim();
    const expenseDate = document.getElementById("expenseDate").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const description = document.getElementById("description").value.trim();

    // ==========================
    // Validation
    // ==========================

    if (expenseName === "") {
        showToast("Please enter Expense Name", "warning");
        return;
    }

    if (expenseDate === "") {
        showToast("Please select Expense Date", "warning");
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        showToast("Please enter a valid Amount", "warning");
        return;
    }

    const expense = {

        expenseName: expenseName,
        expenseDate: expenseDate,
        amount: amount,
        description: description

    };

    fetch(API_BASE_URL + "/expenses", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(expense)

    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Failed to save expense");
        }

        return response.json();

    })

    .then(data => {

        showToast("Expense Added Successfully", "success");

        setTimeout(() => {

            window.location.href = "expenses.html";

        }, 1000);

    })

    .catch(error => {

        console.error(error);

        showToast("Unable to save expense", "error");

    });

});