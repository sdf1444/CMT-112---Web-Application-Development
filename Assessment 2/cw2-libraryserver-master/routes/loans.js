const express = require("express");
const router = express.Router();

const db = require("../data");
const ret = require("../lib/return");

router.get("/", function(req, res) {
    db.Loan.findAll().then(function(loans) {
        ret.json(loans, res);
    });
});

router.get("/:loanID", function(req, res) {
    db.Loan.findByPk(req.params.loanID).then(function(loan) {
        if (loan) {
            ret.json(loan, res);
        } else {
            res.end();
        }
    });
});

router.post("/", function(req, res) {
    db.Loan.create({
        user: req.body.user,
        book: req.body.book,
        dueDate: req.body.dueDate,
    }).then(function(loan) {
        ret.json(loan, res);
    });
});

router.put("/:loanID", function(req, res) {
    db.Loan.findByPk(req.params.loanID).then(function(loan) {
        if (loan) {
            (loan.user = req.body.user),
                (loan.book = req.body.book),
                (loan.dueDate = req.body.dueDate),
                loan.save().then(function(loan) {
                    ret.json(loan, res);
                });
        } else {
            res.end();
        }
    });
});

router.delete("/:loanID", function(req, res) {
    db.Loan.findByPk(req.params.loanID)
        .then(function(loan) {
            if (loan) {
                return loan.destroy();
            } else {
                res.end();
            }
        })
        .then(function() {
            res.end();
        });
});

module.exports = router;