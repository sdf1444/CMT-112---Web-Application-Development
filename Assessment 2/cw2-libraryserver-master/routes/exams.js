const express = require("express");
const router = express.Router();

const db = require("../data");
const ret = require("../lib/return");

router.get("/", function(req, res) {
    db.Exam.findAll().then(function(exams) {
        ret.json(exams, res);
    });
});

router.get("/:examID", function(req, res) {
    db.Exam.findByPk(req.params.examID).then(function(exam) {
        if (exam) {
            ret.json(exam, res);
        } else {
            res.end();
        }
    });
});

router.post("/", function(req, res) {
    db.Exam.create({
        title: req.body.title,
        module: req.body.module,
        course: req.body.course,
        link: req.body.link
    }).then(function(exam) {
        ret.json(exam, res);
    });
});

router.put("/:examID", function(req, res) {
    db.Exam.findByPk(req.params.examID).then(function(exam) {
        if (exam) {
            (exam.title = req.body.title),
                (exam.module = req.body.module),
                (exam.course = req.body.course),
                (exam.link = req.body.link),
                exam.save().then(function(exam) {
                    ret.json(exam, res);
                });
        } else {
            res.end();
        }
    });
});

router.delete("/:examID", function(req, res) {
    db.Exam.findByPk(req.params.examID)
        .then(function(exam) {
            if (exam) {
                return exam.destroy();
            } else {
                res.end();
            }
        })
        .then(function() {
            res.end();
        });
});

module.exports = router;