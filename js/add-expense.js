// =====================================
// Add Expense
// =====================================

const expenseForm = document.getElementById("expenseForm");

expenseForm.addEventListener("submit", function(e) {

    e.preventDefault();

    const expense = {

        expenseName: document.getElementById("expenseName").value,

        expenseDate: document.getElementById("expenseDate").value,

        amount: parseFloat(document.getElementById("amount").value),

        description: document.getElementById("description").value

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

        alert("✅ Expense Added Successfully!");

        window.location.href = "expenses.html";

    })

    .catch(error => {

        console.error(error);

        alert("❌ Error while saving expense!");

    });

});