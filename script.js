//Get quotes from API

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('newquote');
const loader = document.getElementById('loader');


let apiQuotes = [];


//This is to show loading when fetching quotes
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loader when finshed fetching
function complete(){
    quoteContainer.hidden= false;
    loader.hidden= true; 
}

//function to show a new quote
const newQuote = () =>{
    loading();
    // picks a random quote from apiQuotes array

    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

//check if author titke is empty and replace with Unknown
    if(!quote.author){
        authorText.textContent= 'Unknown';

    }else{
        authorText.textContent = quote.author;

    }

    //check quote length to determine styling
    if(quote.text.length > 80){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }

    //Set the quote and hide the loader
    quoteText.textContent = quote.text;
    complete();

}

async function getQuotes() {
    loading();

    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }
    //where to handle the error
    catch (error) {
    }
}

//Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent};`;
    window.open(twitterUrl, '_blank');
}


//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//on load
getQuotes();
