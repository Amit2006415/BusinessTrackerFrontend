const translations = {

    en: {

        // Sidebar
        dashboard: "Dashboard",
        customers: "Customers",
        expenses: "Expenses",
        reports: "Reports",
        logout: "Logout",

        // Dashboard
        totalCustomers: "Total Customers",
        totalIncome: "Total Income",
        totalExpense: "Total Expense",
        totalProfit: "Total Profit",
        paidCustomers: "Paid Customers",
        unpaidCustomers: "Unpaid Customers",
        recentCustomers: "Recent Customers",

        // Customer Page
        customerList: "Customer List",
        addCustomer: "Add Customer",

        // Expense Page
        expenseManagement: "Expense Management",
        addExpense: "Add Expense",
        expenseList: "Expense List",
        expenseName: "Expense Name",

        // Report Page
        businessReports: "Business Reports",
        printReport: "Print Report",

        // Common
        id: "ID",
        name: "Name",
        date: "Date",
        product: "Product",
        total: "Total",
        advance: "Advance",
        due: "Due",
        status: "Status",
        action: "Action",
        amount: "Amount",
        description: "Description"

    },

    mr: {

        // Sidebar
        dashboard: "डॅशबोर्ड",
        customers: "ग्राहक",
        expenses: "खर्च",
        reports: "अहवाल",
        logout: "लॉगआउट",

        // Dashboard
        totalCustomers: "एकूण ग्राहक",
        totalIncome: "एकूण उत्पन्न",
        totalExpense: "एकूण खर्च",
        totalProfit: "एकूण नफा",
        paidCustomers: "पैसे भरलेले ग्राहक",
        unpaidCustomers: "बाकी ग्राहक",
        recentCustomers: "अलीकडील ग्राहक",

        // Customer Page
        customerList: "ग्राहक यादी",
        addCustomer: "ग्राहक जोडा",

        // Expense Page
        expenseManagement: "खर्च व्यवस्थापन",
        addExpense: "खर्च जोडा",
        expenseList: "खर्च यादी",
        expenseName: "खर्चाचे नाव",

        // Report Page
        businessReports: "व्यवसाय अहवाल",
        printReport: "अहवाल मुद्रित करा",

        // Common
        id: "क्रमांक",
        name: "नाव",
        date: "तारीख",
        product: "उत्पादन",
        total: "एकूण",
        advance: "आगाऊ",
        due: "बाकी",
        status: "स्थिती",
        action: "कृती",
        amount: "रक्कम",
        description: "वर्णन"

    }

};

// ==========================================
// Change Language
// ==========================================

function changeLanguage(lang) {

    localStorage.setItem("language", lang);

    document.querySelectorAll("[data-lang]").forEach(function(item) {

        const key = item.getAttribute("data-lang");

        if (translations[lang] && translations[lang][key]) {
            item.innerHTML = translations[lang][key];
        }

    });

}

// ==========================================
// Load Saved Language
// ==========================================

window.addEventListener("DOMContentLoaded", function() {

    const languageSelect = document.getElementById("languageSelect");

    const savedLanguage = localStorage.getItem("language") || "en";

    if (languageSelect) {

        languageSelect.value = savedLanguage;

        languageSelect.addEventListener("change", function() {

            changeLanguage(this.value);

        });

    }

    changeLanguage(savedLanguage);

});