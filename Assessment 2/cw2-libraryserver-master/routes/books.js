const express = require("express");
const router = express.Router();

const db = require("../data");
const ret = require("../lib/return");

router.get("/", function(req, res) {
    db.Book.findAll().then(function(books) {
        ret.json(books, res);
    });
});

router.get("/:bookID", function(req, res) {
    db.Book.findByPk(req.params.userID).then(function(book) {
        if (book) {
            ret.json(book, res);
        } else {
            res.end();
        }
    });
});

router.post("/", function(req, res) {
    db.Book.create({ title: req.body.title, isbn: req.body.isbn, author: req.body.author }).then(function(book) {
        ret.json(book, res);
    });
});

router.put("/:bookID", function(req, res) {
    db.Book.findByPk(req.params.bookID).then(function(book) {
        if (book) {
            book.title = req.body.title;
            book.isbn = req.body.isbn;
            book.author = req.body.author;
            book.save().then(function(book) {
                ret.json(book, res);
            });
        } else {
            res.end();
        }
    });
});

router.delete("/:bookID", function(req, res) {
    db.Book.findByPk(req.params.bookID)
        .then(function(book) {
            if (book) {
                return book.destroy();
            } else {
                res.end();
            }
        })
        .then(function() {
            res.end();
        });
});

module.exports = router;