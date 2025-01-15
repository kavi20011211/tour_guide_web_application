const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Sign Up Function
const signUpFunction = asyncHandler(async (req, res) => {
    const { name, email, password, confirmpassword } = req.body;

    if (!name || !email || !password || !confirmpassword) {
        return res.status(400).json({ "message": "Required fields must be filled with values" });
    }

    const userIsExist = await User.findOne({ email });

    if (userIsExist) {
        return res.status(400).json({ "message": "User already exists!" });
    }

    if (password !== confirmpassword) {
        return res.status(400).json({ "message": "Passwords do not match!" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    if (user) {
        res.status(200).json({
            "message": "User created successfully",
            "User": user
        });
    } else {
        res.status(400).json({ "message": "Something went wrong while creating the user!" });
    }
});

// Sign In Function
const signInFunction = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(401).json({ "message": "Invalid user credentials" });
    }
});

// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

module.exports = {
    signUpFunction,
    signInFunction
};
