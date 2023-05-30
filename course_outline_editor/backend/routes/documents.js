const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const Schemas = require('../models/schemas.js');
const helpers = require('./helpers.js')

const Document = Schemas.Document;
const Course = Schemas.Course;
const EditHistory = Schemas.EditHistory;

router.use(express.json());
router.use(bodyParser());
router
    .route('/:documentID')
    .get(async (req,res) => {
        const document = await findOrCreateDocument(req.params.documentID);
        return res.send(document.data);
    })
    .put(async (req,res) => {
        const updateFields = {data: req.body.ops};
        if (req.body.author) {
              updateFields.author = req.body.author;
        }
        if (req.body.status) {
              updateFields.status = req.body.status;
        }
        const updatedDocument = await Document.findByIdAndUpdate(req.params.documentID, updateFields, {new: true});
        return res.send(updatedDocument);
    })

router
    .route('/:documentID/ga-indicators')
    .get(async (req,res) => {
        const document = await Document.findOrCreateDocument(req.params.documentID);
        const data = await document.gaIndicators;
        return res.send(data);
    })
    .put(async (req,res) => {
        const data = req.body;

        const document = await Document.findByIdAndUpdate(req.params.documentID,{ gaIndicators: data},{new:true});
        
        return res.send(document);
    })

router
    .route('/:documentID/comments')
    .get(async (req,res) => {
        const document = await Document.findById(req.params.documentID);
        if(!document) res.status(400).send('Document does not exist');

        const metadata = document.metadata;

        if(!metadata){
            document.metadata = {
                instructorJustifications: [],
                reviewerComments: []
            }
        }

        return res.send(document.metadata);
    })
    .post(async (req,res) => {
        const document = await Document.findById(req.params.documentID);

        const comment = {
            username: req.body.username,
            commentText: req.body.commentText,
            selectedText: req.body.selectedText
        }

        if(!document.metadata){
            document.metadata = {
                instructorJustifications: [],
                reviewerComments: []
            }
        }

        if(req.body.userRole == 'instructor'){
            comment.type = 'justification';
            document.metadata.instructorJustifications.push(comment);
            document.save();
            return res.send(document.metadata);
        } else if(req.body.userRole == 'reviewer'){
            comment.type = 'comment';
            document.metadata.reviewerComments.push(comment);
            document.save();
            return res.send(document.metadata);
        } else {
            return res.status(400).send('Role is inapplicable.')
        }
    })

router
    .route('/:documentID/activity')
    .post(async (req,res) => {
        const newActivity = new EditHistory({
            username: req.body.username,
            timeStamp:req.body.timeStamp,
            activity: req.body.activity,
            documentID: req.params.documentID
        })
    
        await newActivity.save((err) => {
            if(err){
                return res.status(500).send(err);
            } else {
                return res.json(newActivity);
            }
        })
    })

router
    .route('/draft-outlines/:courseCode')
    .get(async (req,res) => {
        const course = await Course.findOne({code: req.params.courseCode});
        if(!course) return res.status(400).send(`Course with code ${req.params.courseCode} does not exist.`);

        const outlines = course.draftOutlines;
        return res.send(outlines);
    })

router
    .route('/draft-outlines/:courseCode/:name')
    .get(async (req,res) => {
        const course = await Course.findOne({code: req.params.courseCode});

        if(!course.draftOutlines.has(req.params.name)) return res.status(400).send(`Course outline with that name does not exist.`);

        const outline = course.draftOutlines.get(req.params.name);
        return res.send(outline);
    })
    .post(async (req,res) => {
        const course = await Course.findOne({code: req.params.courseCode});
        const document = await Document.findById(req.body.documentID);

        if(!course) return res.status(400).send(`Course with code ${req.params.courseCode} does not exist.`);
        if(!document) return res.status(400).send('Document does not exist');
        if(Array.from(course.draftOutlines.values()).includes(req.body.documentID)) return res.status(400).send('Draft with that documentID already exists');
        if(course.draftOutlines.has(req.params.name)) return res.status(400).send('Draft with that name already exists');

        course.draftOutlines.set(req.params.name, document._id);
        await course.save();
        return res.send(course);
    })

router
    .route('/final-outlines/:courseCode')
    .get(async (req,res) => {
        const course = await Course.findOne({code: req.params.courseCode});
        if(!course) return res.status(400).send(`Course with code ${req.params.courseCode} does not exist.`);

        const outlines = course.finalOutlines;
        return res.send(outlines);
    })

router
    .route('/final-outlines/:courseCode/:year')
    .get(async (req,res) => {
        const course = await Course.findOne({code: req.params.courseCode});

        if(!course.finalOutlines.has(req.params.year)) return res.status(400).send(`Course outline with year ${req.params.year} does not exist.`);

        const outline = course.finalOutlines.get(req.params.year);
        return res.send(outline);
    })
    .post(async (req,res) => {
        //receives body with documentID
        const document = await Document.findById(req.body.documentID);
        const course = await Course.findOne({code: req.params.courseCode});

        if(course.finalOutlines.has(req.params.year) != null) return res.status(400).send('Course outline for that year already exists.');
        if(!document) return res.status(400).send('Document does not exist');

        course.finalOutlines.set(req.params.year, document._id);

        await course.save();
        return res.send(course);
    })

async function findOrCreateDocument(id) {
        if (id == null) return;
      
        const document = await Document.findById(id);
        if (document){
            return document;
        } else {
            console.log('creating new')
            const template = await Document.findById('641df3b1ae277876112bb1ae');
            const newDoc = await Document.create({_id : id, data: template.data})
            return newDoc;
        }        
}

module.exports = router;
