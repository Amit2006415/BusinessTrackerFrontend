// ====================================
// Get Customer ID From URL
// ====================================

const params = new URLSearchParams(window.location.search);
const customerId = params.get("id");

// ====================================
// Load Customer Details
// ====================================

function loadCustomer() {

    fetch(API_BASE_URL + "/customers/" + customerId)

    .then(response => response.json())

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
        alert("Failed to load customer.");

    });

}

// ====================================
// Update Customer
// ====================================

document.getElementById("editCustomerForm")
    .addEventListener("submit", function(e) {

        e.preventDefault();

        const customer = {

            id: customerId,

            customerName: document.getElementById("customerName").value,

            workDate: document.getElementById("workDate").value,

            product: document.getElementById("product").value,

            totalAmount: parseFloat(document.getElementById("totalAmount").value),

            advancePayment: parseFloat(document.getElementById("advancePayment").value)

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

            alert("✅ Customer Updated Successfully");

            window.location.href = "customers.html";

        })

        .catch(error => {

            console.error(error);

            alert("❌ Unable to Update Customer");

        });

    });

// ====================================
// Start
// ====================================

loadCustomer();