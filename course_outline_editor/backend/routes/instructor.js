const express = require('express');
const router = express.Router({ mergeParams: true });
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const helpers = require('./helpers.js');
const Schemas = require('../models/schemas.js');

const Course = Schemas.Course;
const User = Schemas.User;
const Document = Schemas.Document;


//import middleware
router.use(express.json());
router.use(bodyParser.json());
router.use(cookieParser()); 

//functional middleware
router.use(helpers.authenticateToken);
router.use(helpers.authenticateInstructor);

//courses routes
router
    .route('/courses/:username')
    .get((req, res) => {
        Course.find({ instructors: { $in: [req.params.username] } }, (err, data) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                const courses = data;
                return res.json(courses);
            }
        })
    })

router
    .route('/outlines')
    .get((req,res) => {
        Document.find({author: req.params.instructorUser}, (err,data) => {
            if(err){
                return res.status(500).err;
            } else {
                const outlines = data;
                return res.json(outlines);
            }
        })
    })

// GET DRAFTS FROM COURSE CODE
router
    .route('/draft-outlines/:courseCode')
    .get(async (req, res) => {
        const course = await Course.findOne({ code: req.params.courseCode });
        if (!course) return res.status(400).send(`Course with code ${req.params.courseCode} does not exist.`);

        const outlines = course.draftOutlines;
        return res.send(outlines);
    })


// GET DOCUMENT DATA
router
    .route('/:documentID')
    .get(async (req, res) => {
        const document = await findOrCreateDocument(req.params.documentID);
        return res.send(document.data);
    })

    // GET FINALS
router
    .route('/final-outlines/:courseCode')
    .get(async (req, res) => {
        const course = await Course.findOne({ code: req.params.courseCode });
        if (!course) return res.status(400).send(`Course with code ${req.params.courseCode} does not exist.`);

        const outlines = course.finalOutlines;
        return res.send(outlines);
    })


// GET GA INDIS
router
    .route('/:documentID/ga-indicators')
    .get(async (req, res) => {
        const document = await Document.findById(req.params.documentID);
        console.log(document)
        const data = await document.gaIndicators;
        return res.send(data);
    })

module.exports = router;
