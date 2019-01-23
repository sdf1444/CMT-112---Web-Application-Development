const express = require("express");
const router = express.Router();

const db = require("../data");
const ret = require("../lib/return");

router.get("/", function(req, res) {
    db.User.findAll().then(function(users) {
        ret.json(users, res);
    });
});

router.get("/:userID", function(req, res) {
    db.User.findByPk(req.params.userID).then(function(user) {
        if (user) {
            ret.json(user, res);
        } else {
            res.end();
        }
    });
});

router.get("/:userID/loans", function(req, res) {
    db.Loan.findAll().then(function(loans) {
        ret.json(loans, res);
    });
});

router.post("/", function(req, res) {
    db.User.create({
        name: req.body.name,
        barcode: req.body.barcode,
        memberType: req.body.memberType
    }).then(function(user) {
        ret.json(user, res);
    });
});

router.put("/:userID", function(req, res) {
    db.User.findByPk(req.params.userID).then(function(user) {
        if (user) {
            (user.name = req.body.name),
                (user.barcode = req.body.barcode),
                (user.memberType = req.body.memberType),
                user.save().then(function(user) {
                    ret.json(user, res);
                });
        } else {
            res.end();
        }
    });
});

router.delete("/:userID", function(req, res) {
    db.User.findByPk(req.params.userID)
        .then(function(user) {
            if (user) {
                return user.destroy();
            } else {
                res.end();
            }
        })
        .then(function() {
            res.end();
        });
});

module.exports = router;