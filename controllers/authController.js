const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByEmail, createUser } = require('../models/userModel');
require('dotenv').config();

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// REGISTER
const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password)
            return res.status(400).json({ message: 'All fields are required' });

        const existingUser = await findUserByEmail(email);
        if (existingUser)
            return res.status(409).json({ message: 'Email already in use' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await createUser(name, email, hashedPassword);

        const token = generateToken(result.insertId);

        res.status(201).json({ message: 'Account created successfully', token });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// LOGIN
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password)
            return res.status(400).json({ message: 'All fields are required' });

        const user = await findUserByEmail(email);
        if (!user)
            return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: 'Invalid credentials' });

        const token = generateToken(user.id);

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = { register, login };