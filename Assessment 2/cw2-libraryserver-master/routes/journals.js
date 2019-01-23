const express = require("express");
const router = express.Router();

const db = require("../data");
const ret = require("../lib/return");

router.get("/", function(req, res) {
    db.Journal.findAll().then(function(journals) {
        ret.json(journals, res);
    });
});

router.get("/:journalID", function(req, res) {
    db.Journal.findByPk(req.params.journalID).then(function(journal) {
        if (journal) {
            ret.json(journal, res);
        } else {
            res.end();
        }
    });
});

router.post("/", function(req, res) {
    db.Journal.create({
        title: req.body.title,
        journal: req.body.journal,
        issn: req.body.issn
    }).then(function(journal) {
        ret.json(journal, res);
    });
});

router.put("/:journalID", function(req, res) {
    db.Journal.findByPk(req.params.journalID).then(function(journal) {
        if (journal) {
            (journal.title = req.body.title),
                (journal.journal = req.body.journal),
                (journal.issn = req.body.issn),
                journal.save().then(function(journal) {
                    ret.json(journal, res);
                });
        } else {
            res.end();
        }
    });
});

router.delete("/:journalID", function(req, res) {
    db.Journal.findByPk(req.params.journalID)
        .then(function(journal) {
            if (journal) {
                return journal.destroy();
            } else {
                res.end();
            }
        })
        .then(function() {
            res.end();
        });
});

module.exports = router;