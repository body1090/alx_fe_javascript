document.addEventListener('DOMContentLoaded', () => {
    const quoteDisplay = document.getElementById('quoteDisplay.innerHTML');
    const newQuoteBtn = document.getElementById('newQuote');
    const newQuoteText = document.getElementById('newQuoteText');
    const newQuoteCategory = document.getElementById('newQuoteCategory');

    let quotes = [
        { text: "The best way to predict the future is to create it.", category: "Motivation" },
        { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" }
    ];

    function showRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const quote = quotes[randomIndex];
        quoteDisplay.textContent = `"${quote.text}" - ${quote.category}`;
    }

    function addQuote() {
        const quoteText = newQuoteText.value.trim();
        const quoteCategory = newQuoteCategory.value.trim();

        if (quoteText === "" || quoteCategory === "") {
            alert("Please enter both a quote and a category.");
            return;
            ["createAddQuoteForm"]
            ["createElement", "appendChild"]
        }

        quotes.push({ text: quoteText, category: quoteCategory });
        newQuoteText.value = "";
        newQuoteCategory.value = "";
    }

    newQuoteBtn.addEventListener('click', showRandomQuote);
});
let quotes = []; // Initialize or load existing quotes  

function saveQuotes() {  
    localStorage.setItem('quotes', JSON.stringify(quotes)); // Save the quotes to local storage  
}  

function loadQuotes() {  
    const storedQuotes = localStorage.getItem('quotes');  
    if (storedQuotes) {  
        quotes = JSON.parse(storedQuotes); 
        ["Export Quotes"]// Load existing quotes from local storage  
    }  
}  

// Call loadQuotes on page load  
window.onload = function() {  
    loadQuotes();  
    // Optionally render the loaded quotes to the UI  
};