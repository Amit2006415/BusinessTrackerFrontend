// ==========================================
// Check Login
// ==========================================

if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "index.html";
}

// ==========================================
// Load Dashboard Summary
// ==========================================

function loadDashboard() {

    fetch(API_BASE_URL + "/dashboard")

    .then(response => response.json())

    .then(data => {

        document.getElementById("totalCustomers").innerHTML =
            data.totalCustomers;

        document.getElementById("totalIncome").innerHTML =
            "₹ " + data.totalIncome.toFixed(2);

        document.getElementById("totalExpense").innerHTML =
            "₹ " + data.totalExpense.toFixed(2);

        document.getElementById("totalProfit").innerHTML =
            "₹ " + data.totalProfit.toFixed(2);

        // Total Due Amount
        if (document.getElementById("totalDueAmount")) {

            document.getElementById("totalDueAmount").innerHTML =
                "₹ " + data.totalDueAmount.toFixed(2);

        }

        // Current Profit
        if (document.getElementById("currentProfit")) {

            document.getElementById("currentProfit").innerHTML =
                "₹ " + data.currentProfit.toFixed(2);

        }

        document.getElementById("paidCustomers").innerHTML =
            data.paidCustomers;

        document.getElementById("unpaidCustomers").innerHTML =
            data.unpaidCustomers;

    })

    .catch(error => {

        console.error(error);
        showToast("Unable to load dashboard", "error");

    });

}

// ==========================================
// Load Customer Table
// ==========================================

function loadCustomers() {

    fetch(API_BASE_URL + "/customers")

    .then(response => response.json())

    .then(customers => {

        let table = "";

        customers.forEach((customer, index) => {

            table += `
<tr>
    <td>${index + 1}</td>
    <td>${customer.customerName}</td>
    <td>${customer.product}</td>
    <td>₹ ${customer.totalAmount}</td>
    <td>₹ ${customer.advancePayment}</td>
    <td>₹ ${customer.dueAmount}</td>
    <td>${customer.paymentStatus}</td>
</tr>
`;

        });

        document.getElementById("customerTable").innerHTML = table;

    })

    .catch(error => {

        console.error(error);
        showToast("Unable to load customers", "error");

    });

}

// ==========================================
// Open Paid Customers
// ==========================================

function openPaidCustomers() {

    window.location.href = "customers.html?status=PAID";

}

// ==========================================
// Open Unpaid Customers
// ==========================================

function openUnpaidCustomers() {

    window.location.href = "customers.html?status=UNPAID";

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
// Initialize Dashboard
// ==========================================

document.addEventListener("DOMContentLoaded", function() {

    loadDashboard();
    loadCustomers();

});