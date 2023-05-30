const express = require('express');
const router = express.Router({ mergeParams: true });
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const helpers = require('./helpers.js');
const Schemas = require('../models/schemas.js');

const Course = Schemas.Course;
const User = Schemas.User;
const EditHistory = Schemas.EditHistory;

//import middleware
router.use(express.json());
router.use(bodyParser.json());
router.use(cookieParser());

//functional middleware
router.use(helpers.authenticateToken);
router.use(helpers.authenticateAdmin);

//routes

//admin
  
//Edit History Routes
router
    .route('/activity/:documentID')
    .get((req,res) => {
        const query = {};

        if(req.params.documentID != 'all'){
            query.documentID = req.params.documentID;
        }

        EditHistory.find(query, (err,data) => {
            if(err){
                return res.status(500).send(err);
            } else {
                const editHistory = data;
                return res.json(editHistory);
            }
        })
    })

//instructor routes
router
    .route('/users/instructors')
    .get((req, res) => {
        User.find({ role: 'instructor' }, (err, data) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                const instructors = data.map(instructor => {
                    return {
                        id: instructor.id,
                        firstName: instructor.firstName,
                        lastName: instructor.lastName,
                        username: instructor.username,
                        coursesTaught: instructor.coursesTaught
                    };
                });
                return res.json(instructors);
            }
        })
    })
    .post((req, res) => {

        const newInstructor = new User({
            email: req.body.email,
            username: req.body.email.split('@')[0],
            role: 'instructor',
            firstName: req.body.firstName,
            lastName: req.body.lastName
        })

        newInstructor.save((err) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                return res.json(newInstructor);
            }
        })
    })

//courses routes
router
    .route('/courses')
    .get((req, res) => {
        Course.find({}, (err, data) => {
            if (err) {
                return res.status(50).send(err);
            } else {
                const courses = data;
                return res.json(courses);
            }
        })
    })
    .post((req, res) => {
        //create new course from Courses collection
        const newCourse = new Course({
            name: req.body.name,
            code: req.body.code,
            faculty: req.body.faculty
        })

        newCourse.save((err) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                return res.json(newCourse);
            }
        })
    })

router
    .route('/courses/:courseCode/instructors')
    .get(async (req, res) => {
        const course = await Course.findOne({ code: req.params.courseCode })

        if (!course) return res.status(400).send('Course does not exist');

        User.find({
            $and: [
                { role: "instructor" },
                { username: { $in: course.instructors } }
            ]
        }, (err, data) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                const instructors = data.map(instructor => {
                    return {
                        id: instructor.id,
                        firstName: instructor.firstName,
                        lastName: instructor.lastName,
                        username: instructor.username
                    };
                });
                return res.json(instructors);
            }
        })
    })
    .put(async (req, res) => {
        const courseCode = req.params.courseCode;
        const instructorUsername = req.body.instructorUsername;

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const course = await Course.findOneAndUpdate(
                { code: courseCode },
                { $addToSet: { instructors: instructorUsername } },
                { new: true, session }
            );

            //need to check if instructor really is instructor
            const instructor = await User.findOneAndUpdate(
                {
                    $and: [
                        { username: instructorUsername },
                        { role: "instructor" }
                    ]
                },
                { $addToSet: { coursesTaught: courseCode } },
                { new: true, session }
            );

            //instructor will be null if not found in above search
            if (!instructor) {
                throw new Error("Not an instructor")
            }

            await session.commitTransaction();
            session.endSession();

            return res.status(200).json({ course, instructor });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();

            return res.status(500).json({ error: error.message });
        }
    })

module.exports = router;
