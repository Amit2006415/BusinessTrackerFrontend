// ==========================================
// Check Login
// ==========================================

if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "index.html";
}

// ==========================================
// Load Report Data
// ==========================================

function loadReport() {

    fetch(API_BASE_URL + "/dashboard")

    .then(response => {

        if (!response.ok) {
            throw new Error("Failed to load report");
        }

        return response.json();

    })

    .then(data => {

        // ==========================================
        // Existing Report Data
        // ==========================================

        document.getElementById("income").innerHTML =
            "₹ " + data.totalIncome.toFixed(2);

        document.getElementById("expense").innerHTML =
            "₹ " + data.totalExpense.toFixed(2);

        document.getElementById("dueAmount").innerHTML =
            "₹ " + data.totalDueAmount.toFixed(2);

        document.getElementById("currentProfit").innerHTML =
            "₹ " + data.currentProfit.toFixed(2);

        document.getElementById("profit").innerHTML =
            "₹ " + data.totalProfit.toFixed(2);

        // ==========================================
        // Monthly Income
        // ==========================================

        const monthlyIncomeContainer =
            document.getElementById("monthlyIncome");

        if (monthlyIncomeContainer && data.monthlyIncome) {

            let html = "";

            Object.entries(data.monthlyIncome).forEach(
                ([month, amount]) => {

                    html += `
                            <div class="monthly-income-item">

                                <div class="d-flex justify-content-between align-items-center mb-1">

                                    <span class="fw-semibold">
                                        ${month}
                                    </span>

                                    <span class="fw-bold">
                                        ₹ ${Number(amount).toFixed(2)}
                                    </span>

                                </div>

                                <div class="progress" style="height: 8px;">

                                    <div
                                        class="progress-bar"
                                        role="progressbar"
                                        style="width: ${getMonthlyPercentage(
                                            amount,
                                            data.monthlyIncome
                                        )}%">
                                    </div>

                                </div>

                            </div>
                        `;
                }
            );

            monthlyIncomeContainer.innerHTML = html;
        }

    })

    .catch(error => {

        console.error(error);

        showToast("Unable to load Report", "error");

    });
}

// ==========================================
// Calculate Monthly Percentage
// ==========================================

function getMonthlyPercentage(amount, monthlyIncome) {

    const values = Object.values(monthlyIncome);

    const maxIncome = Math.max(...values);

    if (maxIncome === 0) {
        return 0;
    }

    return (Number(amount) / maxIncome) * 100;
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
// Load Reports
// ==========================================

document.addEventListener("DOMContentLoaded", function() {

    loadReport();

});