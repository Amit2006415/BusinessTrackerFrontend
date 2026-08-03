// ==========================================
// Check Login
// ==========================================

if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "index.html";
}

// ==========================================
// Get Expense ID
// ==========================================

const params = new URLSearchParams(window.location.search);
const expenseId = params.get("id");

// ==========================================
// Load Expense
// ==========================================

function loadExpense() {

    fetch(API_BASE_URL + "/expenses/" + expenseId)

    .then(response => {

        if (!response.ok) {
            throw new Error("Expense Not Found");
        }

        return response.json();

    })

    .then(expense => {

        document.getElementById("expenseId").value = expense.id;
        document.getElementById("expenseName").value = expense.expenseName;
        document.getElementById("expenseDate").value = expense.expenseDate;
        document.getElementById("amount").value = expense.amount;
        document.getElementById("description").value = expense.description;

    })

    .catch(error => {

        console.error(error);

        showToast("Unable to load expense", "error");

    });

}

// ==========================================
// Update Expense
// ==========================================

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

        id: expenseId,
        expenseName: expenseName,
        expenseDate: expenseDate,
        amount: amount,
        description: description

    };

    fetch(API_BASE_URL + "/expenses/" + expenseId, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(expense)

    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Update Failed");
        }

        return response.json();

    })

    .then(data => {

        showToast("Expense Updated Successfully", "success");

        setTimeout(() => {

            window.location.href = "expenses.html";

        }, 1000);

    })

    .catch(error => {

        console.error(error);

        showToast("Unable to update expense", "error");

    });

});

// ==========================================
// Start
// ==========================================

loadExpense();