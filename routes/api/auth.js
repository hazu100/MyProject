const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();

router.post('/',
    [
        check('email', 'Please provide a valid email ID')
            .isEmail(),
        check('password', 'Please provide a password with 6 or more characters')
            .isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ errors: [{ message: 'Invalid credentials' }] });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ errors: [{ message: 'Invalid credentials' }] });
            }
            jwt.sign(
                { userId: user.id },
                config.get('myToken'),
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    return res.json({ token, message: 'You have successfully logged in' });
                }
            );
        }
        catch (err) {
            return res.status(500).json({ message: 'Server error' });
        }
    }
);

module.exports = router;