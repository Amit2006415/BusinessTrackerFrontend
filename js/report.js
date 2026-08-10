// ==========================================
// Check Login
// ==========================================

if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "index.html";
}

// ==========================================
// Current Year
// ==========================================

const currentYear = new Date().getFullYear();

// ==========================================
// Load Report Data
// ==========================================

function loadReport(year = currentYear) {

    fetch(API_BASE_URL + "/dashboard?year=" + year)

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
            "₹ " + Number(data.totalIncome).toFixed(2);

        document.getElementById("expense").innerHTML =
            "₹ " + Number(data.totalExpense).toFixed(2);

        document.getElementById("dueAmount").innerHTML =
            "₹ " + Number(data.totalDueAmount).toFixed(2);

        document.getElementById("currentProfit").innerHTML =
            "₹ " + Number(data.currentProfit).toFixed(2);

        document.getElementById("profit").innerHTML =
            "₹ " + Number(data.totalProfit).toFixed(2);

        // ==========================================
        // Monthly Income
        // ==========================================

        const monthlyIncomeContainer =
            document.getElementById("monthlyIncome");

        if (monthlyIncomeContainer && data.monthlyIncome) {

            let html = "";

            Object.entries(data.monthlyIncome).forEach(
                ([month, amount]) => {

                    const percentage =
                        getMonthlyPercentage(
                            amount,
                            data.monthlyIncome
                        );

                    html += `
                            <div class="monthly-income-item mb-3">

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
                                        style="width: ${percentage}%;">
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
// Create Year Options
// ==========================================

function createYearOptions() {

    const yearSelect = document.getElementById("yearSelect");

    if (!yearSelect) {
        return;
    }

    yearSelect.innerHTML = "";

    // Previous 2 years
    for (let year = currentYear - 2; year <= currentYear + 1; year++) {

        const option = document.createElement("option");

        option.value = year;
        option.textContent = year;

        if (year === currentYear) {
            option.selected = true;
        }

        yearSelect.appendChild(option);
    }

    // ==========================================
    // Year Change
    // ==========================================

    yearSelect.addEventListener("change", function() {

        const selectedYear = Number(this.value);

        loadReport(selectedYear);

    });
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

    createYearOptions();

    loadReport(currentYear);

});