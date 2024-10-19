document.addEventListener('DOMContentLoaded', () => {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteBtn = document.getElementById('newQuote');
    const newQuoteText = document.getElementById('newQuoteText');
    const newQuoteCategory = document.getElementById('newQuoteCategory');
    const categoryFilter = document.getElementById('categoryFilter');

    // Load quotes from Local Storage
    function loadQuotes() {
        const storedQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
        quotes = storedQuotes;
        populateCategories();
        showRandomQuote();
    }

    // Save quotes to Local Storage
    function saveQuotes() {
        localStorage.setItem('quotes', JSON.stringify(quotes));
    }

    // Populate categories dynamically
    function populateCategories() {
        const categories = [...new Set(quotes.map(quote => quote.category))];
        categoryFilter.innerHTML = '<option value="all">All Categories</option>';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }

    // Filter quotes based on selected category
    function filterQuotes() {
        const selectedCategory = categoryFilter.value;
        const filteredQuotes = selectedCategory === 'all'
            ? quotes
            : quotes.filter(quote => quote.category === selectedCategory);
        quoteDisplay.textContent = filteredQuotes.length
            ? `"${filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)].text}" - ${filteredQuotes[0].category}`
            : 'No quotes available for this category.';
        localStorage.setItem('lastCategory', selectedCategory);
    }

    let quotes = [
        { text: "The best way to predict the future is to create it.", category: "Motivation" },
        { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" }
    ];

    function showRandomQuote() {
        filterQuotes();
        sessionStorage.setItem('lastQuote', JSON.stringify(quote));
    }

    function addQuote() {
        const quoteText = newQuoteText.value.trim();
        const quoteCategory = newQuoteCategory.value.trim();

        if (quoteText === "" || quoteCategory === "") {
            alert("Please enter both a quote and a category.");
            return;
        }

        quotes.push({ text: quoteText, category: quoteCategory });
        saveQuotes();
        populateCategories();
        newQuoteText.value = "";
        newQuoteCategory.value = "";
    }

    // Event listener for the "Add Task" button
    newQuoteBtn.addEventListener('click', showRandomQuote);

    loadQuotes();
});