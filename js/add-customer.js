// ===============================
// Add Customer
// ===============================

const customerForm = document.getElementById("customerForm");

customerForm.addEventListener("submit", function(e) {

    e.preventDefault();

    const customer = {

        customerName: document.getElementById("customerName").value,

        workDate: document.getElementById("workDate").value,

        product: document.getElementById("product").value,

        totalAmount: parseFloat(document.getElementById("totalAmount").value),

        advancePayment: parseFloat(document.getElementById("advancePayment").value)

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

        alert("✅ Customer Added Successfully!");

        window.location.href = "customers.html";

    })

    .catch(error => {

        console.error(error);

        alert("❌ Error while saving customer!");

    });

});