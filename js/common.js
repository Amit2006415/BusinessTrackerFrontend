// ==========================================
// Toast Notification
// ==========================================

function showToast(message, type = "success") {

    const toast = document.getElementById("appToast");
    const toastMessage = document.getElementById("toastMessage");

    if (!toast || !toastMessage) return;

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

// ==========================================
// Responsive Sidebar
// ==========================================

document.addEventListener("DOMContentLoaded", function() {

    const menuBtn = document.getElementById("menuBtn");
    const sidebar = document.querySelector(".sidebar");

    if (!menuBtn || !sidebar) return;

    // Open / Close Sidebar
    menuBtn.addEventListener("click", function(e) {

        e.stopPropagation();

        sidebar.classList.toggle("active");

    });

    // Close Sidebar when clicking outside
    document.addEventListener("click", function(e) {

        if (
            sidebar.classList.contains("active") &&
            !sidebar.contains(e.target) &&
            !menuBtn.contains(e.target)
        ) {

            sidebar.classList.remove("active");

        }

    });

    // Close Sidebar when any menu item is clicked
    const links = sidebar.querySelectorAll("a");

    links.forEach(function(link) {

        link.addEventListener("click", function() {

            sidebar.classList.remove("active");

        });

    });

});