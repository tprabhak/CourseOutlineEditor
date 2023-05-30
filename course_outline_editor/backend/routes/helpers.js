require("dotenv").config();
const express = require('express');
const router = express.Router({mergeParams: true});
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

router.use(cookieParser());

function authenticateToken (req,res,next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if(token == null) {
        console.log("You are not logged in");
        return res.status(401).send(token);
    }

    try {
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // If the token is valid, attach the payload to the request object
        req.user = payload;
        // Call the next middleware or route handler
        next();
    } catch (error) {
        // If the token is invalid, send an error response to the client
        return res.status(401).send(error);
    }
}

// function authenticateAdmin(req,res,next){
//     if(req.params.adminUser != req.user.username) return res.status(401).send("Not the same user");
//     if(req.user.role != "admin") return res.status(401).send("Not an admin");

//     next();
// }

function authenticateAdmin(req, res, next){
    if(req.params.adminUser != req.user.username) return res.status(401).send("Not the same user");
    if(req.user.role != "admin") return res.status(401).send("Not an admin");

    next();

    // return (req, res, next) => {
    //     // 
    //     if (req.user.role !== role) {
    //         res.status(401)
    //         return res.send('Not allowed')
    //       }

    //     next()
    // }
}

function authenticateInstructor(req, res, next){
    if(req.params.instructorUser != req.user.username) return res.status(401).send("Not the same user");
    if(req.user.role != "instructor") return res.status(401).send("Not an instructor");

    next();
}

function authenticateReviewer(req, res, next){
    if(req.params.reviewerUser != req.user.username) return res.status(401).send("Not the same user");
    if(req.user.role != "reviewer") return res.status(401).send("Not a reviewer");
    
    next();
}

module.exports = {
    authenticateToken,
    authenticateAdmin,
    authenticateInstructor,
    authenticateReviewer
}