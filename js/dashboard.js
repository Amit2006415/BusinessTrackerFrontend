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

        document.getElementById("totalCustomers").innerHTML = data.totalCustomers;

        document.getElementById("totalIncome").innerHTML =
            "₹ " + data.totalIncome;

        document.getElementById("totalExpense").innerHTML =
            "₹ " + data.totalExpense;

        document.getElementById("totalProfit").innerHTML =
            "₹ " + data.totalProfit;

        document.getElementById("paidCustomers").innerHTML =
            data.paidCustomers;

        document.getElementById("unpaidCustomers").innerHTML =
            data.unpaidCustomers;

    })

    .catch(error => {

        console.log(error);

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

        console.log(error);

    });

}

// ==========================================
// Sidebar Toggle
// ==========================================

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");
const content = document.querySelector(".content");

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        sidebar.classList.toggle("show");
        sidebar.classList.toggle("close");
        content.classList.toggle("full");

    });

}

// ==========================================
// Load Dashboard
// ==========================================

loadDashboard();
loadCustomers();

// ==========================================
// Logout
// ==========================================

function logout() {

    if (confirm("Are you sure you want to logout?")) {

        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("adminEmail");

        window.location.href = "index.html";

    }

}