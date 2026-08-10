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

function loadReport(year = null) {

    let url = API_BASE_URL + "/dashboard";

    if (year !== null) {
        url += "?year=" + year;
    }

    fetch(url)

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
        // Create Dynamic Year Options
        // ==========================================

        if (data.availableYears) {

            createYearOptions(
                data.availableYears,
                year
            );
        }

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
// Create Dynamic Year Options
// ==========================================

function createYearOptions(availableYears, selectedYear) {

    const yearSelect =
        document.getElementById("yearSelect");

    if (!yearSelect) {
        return;
    }

    yearSelect.innerHTML = "";

    // ==========================================
    // No Years Available
    // ==========================================

    if (!availableYears || availableYears.length === 0) {

        const option = document.createElement("option");

        option.value = currentYear;
        option.textContent = currentYear;
        option.selected = true;

        yearSelect.appendChild(option);

        return;
    }

    // ==========================================
    // Sort Years
    // Oldest → Newest
    // ==========================================

    availableYears.sort((a, b) => a - b);

    // ==========================================
    // Add Years
    // ==========================================

    availableYears.forEach(year => {

        const option =
            document.createElement("option");

        option.value = year;
        option.textContent = year;

        if (
            selectedYear !== null &&
            Number(selectedYear) === Number(year)
        ) {

            option.selected = true;
        }

        yearSelect.appendChild(option);
    });

    // ==========================================
    // If No Selected Year
    // Select Latest Available Year
    // ==========================================

    if (selectedYear === null) {

        yearSelect.value =
            availableYears[availableYears.length - 1];
    }
}

// ==========================================
// Year Change
// ==========================================

function setupYearChange() {

    const yearSelect =
        document.getElementById("yearSelect");

    if (!yearSelect) {
        return;
    }

    yearSelect.addEventListener("change", function() {

        const selectedYear =
            Number(this.value);

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

    // First load without specifying year.
    // Backend will select the latest available year.

    loadReport();

    setupYearChange();

});