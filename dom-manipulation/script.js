document.addEventListener('DOMContentLoaded', () => {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteBtn = document.getElementById('newQuote');
    const newQuoteText = document.getElementById('newQuoteText');
    const newQuoteCategory = document.getElementById('newQuoteCategory');
    const categoryFilter = document.getElementById('categoryFilter');

    let quotes = [];

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

    // Fetch quotes from server (JSONPlaceholder)
    function fetchServerQuotes() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => {
                const serverQuotes = data.map(item => ({ text: item.title, category: 'General' }));
                quotes.push(...serverQuotes);
                saveQuotes();
                populateCategories();
                showRandomQuote();
            })
            .catch(error => console.error('Error fetching quotes from server:', error));
    }

    // Sync quotes periodically
    function syncQuotes() {
        setInterval(fetchServerQuotes, 60000); // Fetch new quotes every 60 seconds
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

    function showRandomQuote() {
        filterQuotes();
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

    // Event listeners
    newQuoteBtn.addEventListener('click', showRandomQuote);

    loadQuotes();
    fetchServerQuotes(); // Initial server fetch
    syncQuotes(); // Start periodic syncing
});
setInterval(async () => {  
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');  
    const quotes = await response.json();  
    updateLocalQuotes(quotes);  
}, 5000); // Fetch new quotes every 5 seconds
function updateLocalQuotes(serverQuotes) {  
    const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];  
    // Replace old quotes with server quotes  
    localStorage.setItem('quotes', JSON.stringify(serverQuotes));  
}
function notifyUserOfUpdate() {  
    alert('Quotes have been updated from the server.');  
}
["fetchQuotesFromServer"]
