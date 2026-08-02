// ====================================
// Get Expense ID From URL
// ====================================

const params = new URLSearchParams(window.location.search);
const expenseId = params.get("id");

// ====================================
// Load Expense Details
// ====================================

function loadExpense() {

    fetch("http://localhost:8080/api/expenses/" + expenseId)

    .then(response => response.json())

    .then(expense => {

        document.getElementById("expenseId").value = expense.id;
        document.getElementById("expenseName").value = expense.expenseName;
        document.getElementById("expenseDate").value = expense.expenseDate;
        document.getElementById("amount").value = expense.amount;
        document.getElementById("description").value = expense.description;

    })

    .catch(error => {

        console.error(error);
        alert("Failed to load expense.");

    });

}

// ====================================
// Update Expense
// ====================================

document.getElementById("expenseForm")
    .addEventListener("submit", function(e) {

        e.preventDefault();

        const expense = {

            id: expenseId,

            expenseName: document.getElementById("expenseName").value,

            expenseDate: document.getElementById("expenseDate").value,

            amount: parseFloat(document.getElementById("amount").value),

            description: document.getElementById("description").value

        };

        fetch("http://localhost:8080/api/expenses/" + expenseId, {

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

            alert("✅ Expense Updated Successfully");

            window.location.href = "expenses.html";

        })

        .catch(error => {

            console.error(error);

            alert("❌ Unable to Update Expense");

        });

    });

// ====================================
// Start
// ====================================

loadExpense();