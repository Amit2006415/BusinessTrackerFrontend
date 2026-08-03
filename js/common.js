// ==========================================
// Toast Notification
// ==========================================

function showToast(message, type = "success") {

    const toast = document.getElementById("appToast");
    const toastMessage = document.getElementById("toastMessage");

    if (toast && toastMessage) {

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
}

// ==========================================
// Responsive Sidebar
// ==========================================

document.addEventListener("DOMContentLoaded", function() {

    const menuBtn = document.getElementById("menuBtn");
    const sidebar = document.querySelector(".sidebar");

    if (!menuBtn) {
        console.log("menuBtn not found");
        return;
    }

    if (!sidebar) {
        console.log("sidebar not found");
        return;
    }

    // Toggle Sidebar

    menuBtn.onclick = function(e) {

        e.preventDefault();
        e.stopPropagation();

        sidebar.classList.toggle("show");

    };

    // Close Sidebar when clicking outside

    document.addEventListener("click", function(e) {

        if (
            sidebar.classList.contains("show") &&
            !sidebar.contains(e.target) &&
            !menuBtn.contains(e.target)
        ) {

            sidebar.classList.remove("show");

        }

    });

    // Close Sidebar after clicking menu

    sidebar.querySelectorAll("a").forEach(function(link) {

        link.addEventListener("click", function() {

            sidebar.classList.remove("show");

        });

    });

});