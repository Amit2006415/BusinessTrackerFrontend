const translations = {

    en: {
        dashboard: "Dashboard",
        customers: "Customers",
        expenses: "Expenses",
        reports: "Reports",
        logout: "Logout",

        totalCustomers: "Total Customers",
        totalIncome: "Total Income",
        totalExpense: "Total Expense",
        totalProfit: "Total Profit",

        paidCustomers: "Paid Customers",
        unpaidCustomers: "Unpaid Customers",

        recentCustomers: "Recent Customers",

        id: "ID",
        name: "Name",
        product: "Product",
        total: "Total",
        advance: "Advance",
        due: "Due",
        status: "Status"
    },

    mr: {
        dashboard: "डॅशबोर्ड",
        customers: "ग्राहक",
        expenses: "खर्च",
        reports: "अहवाल",
        logout: "लॉगआउट",

        totalCustomers: "एकूण ग्राहक",
        totalIncome: "एकूण उत्पन्न",
        totalExpense: "एकूण खर्च",
        totalProfit: "एकूण नफा",

        paidCustomers: "पैसे भरलेले ग्राहक",
        unpaidCustomers: "बाकी ग्राहक",

        recentCustomers: "अलीकडील ग्राहक",

        id: "क्रमांक",
        name: "नाव",
        product: "उत्पादन",
        total: "एकूण",
        advance: "आगाऊ",
        due: "बाकी",
        status: "स्थिती"
    }

};

function changeLanguage(lang) {

    localStorage.setItem("language", lang);

    document.querySelectorAll("[data-lang]").forEach(item => {

        const key = item.getAttribute("data-lang");

        if (translations[lang][key]) {
            item.innerHTML = translations[lang][key];
        }

    });

}

window.addEventListener("DOMContentLoaded", () => {

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