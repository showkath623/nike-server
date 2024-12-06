const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.post('/:uid', async (req, res) => {
    const { uid, password } = req.params;
    const userFound = await User.findOne({ uid });
    if (userFound) {
        if (userFound.password === password) {
            res.status(200).json({
                message: 'Login Successful',
            })  
        } else {
            res.status(401).json({
                message: 'Incorrect Password',
            })
        }
    } else {
        res.status(404).json({
            message: 'User not found',
        })
    }
});