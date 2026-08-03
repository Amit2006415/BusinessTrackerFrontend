// =======================================
// Check Login
// =======================================

if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "index.html";
}

// =======================================
// Load All Expenses
// =======================================

let expenses = [];

function loadExpenses() {

    fetch(API_BASE_URL + "/expenses")

    .then(response => response.json())

    .then(data => {

        expenses = data;

        displayExpenses(expenses);

    })

    .catch(error => {

        console.error(error);

        showToast("Unable to connect to Spring Boot Server", "error");

    });

}

// =======================================
// Display Expenses
// =======================================

function displayExpenses(expenseList) {

    let table = "";

    expenseList.forEach((expense, index) => {

        table += `

<tr>

<td>${index + 1}</td>

<td>${expense.expenseName}</td>

<td>${expense.expenseDate}</td>

<td>₹ ${expense.amount}</td>

<td>${expense.description}</td>

<td>

<button
class="btn btn-warning btn-sm"
onclick="editExpense(${expense.id})">

<i class="bi bi-pencil-square"></i>
Edit

</button>

<button
class="btn btn-danger btn-sm ms-2"
onclick="deleteExpense(${expense.id})">

<i class="bi bi-trash"></i>
Delete

</button>

</td>

</tr>

`;

    });

    document.getElementById("expenseTable").innerHTML = table;

}

// =======================================
// Search Expense
// =======================================

function searchExpense() {

    let keyword = document
        .getElementById("search")
        .value
        .toLowerCase();

    let filtered = expenses.filter(expense =>
        expense.expenseName.toLowerCase().includes(keyword)
    );

    displayExpenses(filtered);

}

// =======================================
// Delete Expense
// =======================================

function deleteExpense(id) {

    if (!confirm("Are you sure you want to delete this expense?")) {
        return;
    }

    fetch(API_BASE_URL + "/expenses/" + id, {

        method: "DELETE"

    })

    .then(response => response.text())

    .then(data => {

        showToast(data, "success");

        loadExpenses();

    })

    .catch(error => {

        console.error(error);

        showToast("Unable to delete expense", "error");

    });

}

// =======================================
// Edit Expense
// =======================================

function editExpense(id) {

    window.location.href = "edit-expense.html?id=" + id;

}

// =======================================
// Start
// =======================================

loadExpenses();