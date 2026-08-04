// ================================
// Global Variables
// ================================

let customers = [];

// ================================
// Load All Customers
// ================================

function loadCustomers() {

    fetch(API_BASE_URL + "/customers")

    .then(response => response.json())

    .then(data => {

        customers = data;

        // Read status from URL
        const params = new URLSearchParams(window.location.search);
        const status = params.get("status");

        if (status) {

            const filteredCustomers = customers.filter(customer => {

                return customer.paymentStatus &&
                    customer.paymentStatus.toUpperCase() === status.toUpperCase();

            });

            displayCustomers(filteredCustomers);

        } else {

            displayCustomers(customers);

        }

    })

    .catch(error => {

        console.error("Error :", error);

        alert("Cannot connect to Spring Boot Server");

    });

}

// ================================
// Display Customers
// ================================

function displayCustomers(customerList) {

    let table = "";

    customerList.forEach((customer, index) => {

        table += `

<tr>

<td>${index + 1}</td>

<td>${customer.customerName}</td>

<td>${customer.workDate}</td>

<td>${customer.product}</td>

<td>₹ ${customer.totalAmount}</td>

<td>₹ ${customer.advancePayment}</td>

<td>₹ ${customer.dueAmount}</td>

<td>${customer.paymentStatus}</td>

<td>

<button class="btn btn-warning btn-sm"
onclick="editCustomer(${customer.id})">

<i class="bi bi-pencil-square"></i>

Edit

</button>

<button class="btn btn-danger btn-sm ms-2"
onclick="deleteCustomer(${customer.id})">

<i class="bi bi-trash"></i>

Delete

</button>

</td>

</tr>

`;

    });

    document.getElementById("customerTable").innerHTML = table;

}

// ================================
// Search Customer
// ================================

function searchCustomer() {

    let keyword = document
        .getElementById("search")
        .value
        .toLowerCase();

    let filtered = customers.filter(customer =>

        customer.customerName.toLowerCase().includes(keyword)

    );

    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");

    if (status) {

        filtered = filtered.filter(customer =>

            customer.paymentStatus &&
            customer.paymentStatus.toUpperCase() === status.toUpperCase()

        );

    }

    displayCustomers(filtered);

}

// ================================
// Delete Customer
// ================================

function deleteCustomer(id) {

    if (!confirm("Are you sure you want to delete this customer?")) {

        return;

    }

    fetch(API_BASE_URL + "/customers/" + id, {

        method: "DELETE"

    })

    .then(response => response.text())

    .then(data => {

        alert(data);

        loadCustomers();

    })

    .catch(error => {

        console.error(error);

    });

}

// ================================
// Edit Customer
// ================================

function editCustomer(id) {

    window.location.href = "edit-customer.html?id=" + id;

}

// ================================
// Start
// ================================

loadCustomers();