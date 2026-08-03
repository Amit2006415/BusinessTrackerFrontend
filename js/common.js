// ===========================================
// Toast Message
// ===========================================

function showToast(message, type = "success") {

    const toast = document.getElementById("appToast");

    if (!toast) return;

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

// ===========================================
// Sidebar Toggle
// ===========================================

document.addEventListener("DOMContentLoaded", function() {

    const menuBtn = document.getElementById("menuBtn");
    const sidebar = document.querySelector(".sidebar");
    const content = document.querySelector(".content");

    if (menuBtn && sidebar) {

        menuBtn.addEventListener("click", function() {

            sidebar.classList.toggle("show");
            sidebar.classList.toggle("close");

            if (content) {
                content.classList.toggle("full");
            }

        });

        // Close sidebar when clicking outside (Mobile)

        document.addEventListener("click", function(e) {

            if (
                window.innerWidth <= 992 &&
                sidebar.classList.contains("show") &&
                !sidebar.contains(e.target) &&
                !menuBtn.contains(e.target)
            ) {

                sidebar.classList.remove("show");

            }

        });

    }

});