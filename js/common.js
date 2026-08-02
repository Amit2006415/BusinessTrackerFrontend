function showToast(message, type = "success") {

    const toast = document.getElementById("appToast");
    const toastMessage = document.getElementById("toastMessage");

    toastMessage.innerHTML = message;

    toast.classList.remove(
        "text-bg-success",
        "text-bg-danger",
        "text-bg-warning"
    );

    if (type === "success") {

        toast.classList.add("text-bg-success");

    } else if (type === "error") {

        toast.classList.add("text-bg-danger");

    } else {

        toast.classList.add("text-bg-warning");

    }

    const bsToast = new bootstrap.Toast(toast);

    bsToast.show();

}

// ===========================
// Responsive Sidebar
// ===========================

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");

if (menuBtn && sidebar) {

    menuBtn.addEventListener("click", function() {

        sidebar.classList.toggle("active");

    });

}

document.addEventListener("click", function(e) {

    if (
        sidebar &&
        sidebar.classList.contains("active") &&
        !sidebar.contains(e.target) &&
        !menuBtn.contains(e.target)
    ) {

        sidebar.classList.remove("active");

    }

});