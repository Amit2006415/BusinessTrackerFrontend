// ==========================================
// Check Login
// ==========================================

if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "index.html";
}

// ==========================================
// Get Customer ID
// ==========================================

const params = new URLSearchParams(window.location.search);
const customerId = params.get("id");

// ==========================================
// Load Customer
// ==========================================

function loadCustomer() {

    fetch(API_BASE_URL + "/customers/" + customerId)

    .then(response => {

        if (!response.ok) {
            throw new Error("Customer Not Found");
        }

        return response.json();

    })

    .then(customer => {

        document.getElementById("customerId").value = customer.id;
        document.getElementById("customerName").value = customer.customerName;
        document.getElementById("workDate").value = customer.workDate;
        document.getElementById("product").value = customer.product;
        document.getElementById("totalAmount").value = customer.totalAmount;
        document.getElementById("advancePayment").value = customer.advancePayment;

    })

    .catch(error => {

        console.error(error);

        showToast("Unable to load customer", "error");

    });

}

// ==========================================
// Update Customer
// ==========================================

const editCustomerForm = document.getElementById("editCustomerForm");

editCustomerForm.addEventListener("submit", function(e) {

    e.preventDefault();

    const customerName = document.getElementById("customerName").value.trim();
    const workDate = document.getElementById("workDate").value;
    const product = document.getElementById("product").value.trim();
    const totalAmount = parseFloat(document.getElementById("totalAmount").value);
    const advancePayment = parseFloat(document.getElementById("advancePayment").value);

    // ==========================
    // Validation
    // ==========================

    if (customerName === "") {

        showToast("Please enter Customer Name", "warning");
        return;

    }

    if (product === "") {

        showToast("Please enter Product Name", "warning");
        return;

    }

    if (isNaN(totalAmount) || totalAmount <= 0) {

        showToast("Enter valid Total Amount", "warning");
        return;

    }

    if (advancePayment > totalAmount) {

        showToast("Advance cannot be greater than Total Amount", "warning");
        return;

    }

    const customer = {

        id: customerId,

        customerName: customerName,

        workDate: workDate,

        product: product,

        totalAmount: totalAmount,

        advancePayment: advancePayment

    };

    fetch(API_BASE_URL + "/customers/" + customerId, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(customer)

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Update Failed");

        }

        return response.json();

    })

    .then(data => {

        showToast("Customer Updated Successfully", "success");

        setTimeout(() => {

            window.location.href = "customers.html";

        }, 1000);

    })

    .catch(error => {

        console.error(error);

        showToast("Unable to update customer", "error");

    });

});

// ==========================================
// Start
// ==========================================

loadCustomer();