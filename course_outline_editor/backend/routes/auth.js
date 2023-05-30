require("dotenv").config();
const express = require('express');
const router = express.Router();
const expressSanitizer = require('express-sanitizer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Schemas = require('../models/schemas.js');
const User = Schemas.User;

//middleware
router.use(express.json());
router.use(expressSanitizer());

router
    .route('/users/login')
    .post( async (req,res) => {
        console.log('logging in')
        const user = await User.findOne({username:req.body.username});
        if (!user){
            return res.status(400).send("User not found");
        }

        try {
            if(await bcrypt.compare(req.body.password, user.password)) {
                
                //change payload based on needs
                const payload = {
                    username:user.username,
                    email:user.email,
                    role:user.role,
                }

                const accessToken = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET);

                // jwt stored in httpOnly cookie
                // res.cookie('token', accessToken, { httpOnly: true });

                res.json({ accessToken: accessToken });
            } else {
                return res.status(401).send('Unauthorized')
            }
        } catch(error) {
            return res.status(500).send(error.message)
        }
    })

router
    .route('/users')
    .post(async (req,res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const payload = {
                email:req.body.email,
                username:req.body.email.split('@')[0],
                password:hashedPassword,
                role:req.body.role,
                firstName:req.body.firstName,
                lastName:req.body.lastName
            }

            const newUser = new User(payload);
            await newUser.save();
            return res.status(201).send(payload);
        } catch(error) {
            return res.status(500).send(error.message);
        }
    })

module.exports = router;
