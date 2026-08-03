// =======================================
// Check Login
// =======================================

if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "index.html";
}

// =======================================
// Add Customer
// =======================================

const customerForm = document.getElementById("customerForm");

customerForm.addEventListener("submit", function(e) {

    e.preventDefault();

    const customerName = document.getElementById("customerName").value.trim();
    const workDate = document.getElementById("workDate").value;
    const product = document.getElementById("product").value.trim();
    const totalAmount = parseFloat(document.getElementById("totalAmount").value);
    const advancePayment = parseFloat(document.getElementById("advancePayment").value || 0);

    // ===============================
    // Validation
    // ===============================

    if (customerName === "") {
        showToast("Please enter Customer Name", "warning");
        return;
    }

    if (product === "") {
        showToast("Please enter Product Name", "warning");
        return;
    }

    if (isNaN(totalAmount) || totalAmount <= 0) {
        showToast("Enter a valid Total Amount", "warning");
        return;
    }

    if (advancePayment > totalAmount) {
        showToast("Advance Payment cannot be greater than Total Amount", "warning");
        return;
    }

    const customer = {

        customerName: customerName,
        workDate: workDate,
        product: product,
        totalAmount: totalAmount,
        advancePayment: advancePayment

    };

    fetch(API_BASE_URL + "/customers", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(customer)

    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Failed to save customer");
        }

        return response.json();

    })

    .then(data => {

        showToast("Customer Added Successfully", "success");

        setTimeout(() => {

            window.location.href = "customers.html";

        }, 1000);

    })

    .catch(error => {

        console.error(error);

        showToast("Unable to save customer", "error");

    });

});