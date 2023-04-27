const User = require('../models/User');
const jwt = require('jsonwebtoken');    
const bcrypt = require('bcrypt');
require('dotenv').config();

const register = async (req, res) => {
    try {
        const { name, regno, email, phone, room, type, password } = req.body;
        const usedEmail = await User.findOne({ email });
        if (usedEmail) {
            return res.status(400).json({
                message: 'Email already registered'
            });
        }
        const usedRegno = await User.findOne({ regno });
        if (usedRegno) {
            return res.status(400).json({
                message: 'Already Registered'
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            name: name,
            regno: regno,
            type: type,
            phone: phone,
            room: room,
            email: email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({
            message: 'User created successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const login = async (req, res) => {
    try {
        const { regno, password } = req.body;
        const user = await User.findOne({ regno });
        if (!user) {
            return res.status(400).json({
                message: 'User not found'
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Incorrect password'
            });
        }
        const token = jwt.sign({
            userId: user._id,
            name: user.name
        }, process.env.JWT_SECRET, {
            expiresIn: '2h'
        });
        res.status(200).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                regno: user.regno,
                type: user.type,
            },
            token: token
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const verify = async (req, res) => {
    try {
        const token =  req.params.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) {
            res.status(200).json({
                message: 'User verified successfully'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { username, user_avatar } = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, {
            username: username,
            user_avatar: user_avatar
        }, { new: true });
        res.status(200).json({
            updatedUser
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    register,
    login,
    verify,
    getUsers,
    getUser,
    updateUser
}