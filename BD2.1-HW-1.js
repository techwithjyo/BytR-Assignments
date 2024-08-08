const express = require('express');
const app = express();
const port = 3000;

let book = {
    title: "Own Yourself",
    author: "God Knows",
    publicationYear:1997,
    genre: "Novel",
    isAvailable: true,
    stocks: 5
};

function getFullTitleAndAuthor(book) {
    return { fullTitleAndAuthor: book.title +" by " + book.author };
}

function getGenreAndAvailability(book) {
    return { genre: book.genre, isAvailable: book.isAvailable };
}

function calculateBookAge(book) {
    const currentYear = new Date().getFullYear();
    return currentYear - book.publicationYear;
}

function getBookSummary(book) {
    return {
       summary: "Title: "+ book.title + ", Author: " + book.author +", Genre: "+ book.genre +
           ", Published: "+ book.publicationYear
    };
}

function checkStockAndOrder(book) {
    return { stocks:  book.stocks > 0 ? book.stocks : "Order Required"
            , status: book.stocks > 0 ? "In Stock" : "Out of Stock" };
}

app.get('/book', (req, res) => {
    res.json(book);
});

app.get('/book/fulltitle-author', (req, res) => {
    res.json(getFullTitleAndAuthor(book));
});

app.get('/book/genre-availability', (req, res) => {
    res.json(getGenreAndAvailability(book));
});

app.get('/book/age', (req, res) => {
    res.json({ age: calculateBookAge(book) });
});

app.get('/book/summary', (req, res) => {
    res.json(getBookSummary(book));
});

app.get('/book/stock-status', (req, res) => {
    res.json(checkStockAndOrder(book));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});