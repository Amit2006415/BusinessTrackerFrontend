// ==========================================
// Check Login
// ==========================================

if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "index.html";
}

// ------------------------------
// Load Dashboard Summary
// ------------------------------

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

// ------------------------------
// Load Customer Table
// ------------------------------

function loadCustomers() {

    fetch(API_BASE_URL + "/customers")

    .then(response => response.json())

    .then(customers => {

        let table = "";

        customers.forEach(customer => {

            table += `

<tr>

<td>${customer.id}</td>

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

// ------------------------------
// Load Everything
// ------------------------------

loadDashboard();
loadCustomers();

// =========================
// Dark Mode
// =========================

const toggleBtn = document.getElementById("themeToggle");

if (toggleBtn) {

    if (localStorage.getItem("theme") === "dark") {

        document.body.classList.add("dark-mode");
        toggleBtn.innerHTML = "☀️";

    }

    toggleBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {

            localStorage.setItem("theme", "dark");
            toggleBtn.innerHTML = "☀️";

        } else {

            localStorage.setItem("theme", "light");
            toggleBtn.innerHTML = "🌙";

        }

    });

}

// =========================
// Logout
// =========================

function logout() {

    if (confirm("Are you sure you want to logout?")) {

        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("adminEmail");

        window.location.href = "index.html";

    }

}