const express = require('express');
const router = express.Router();
const User = require('../models/User');



router.post('/', async (req, res) => {
    const { name, email, password, uid } = req.body; 
    const userFound = await User.findOne({ uid }); 

    if (userFound) {
        return res.status(422).json({ message: 'User Already Exists' });
    } else {
        const newUser = new User({
            name,
            email,
            password,
            uid
        });
        
        try {
            const registerUser = await newUser.save();
            res.status(201).json({
                message: 'User Registered Successfully',
                user: registerUser 
            });
        } catch (error) {
            console.error("Error saving user:", error); 
            res.status(500).json({ message: 'Error saving user' });
        }
    }
});


module.exports = router;
