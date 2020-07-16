const express = require('express');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const User = require('../../model/user');

const router = express.Router();

router.post('/',
    [
        check('name', 'Please provide your name')
            .not()
            .isEmpty(),
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
        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ message: 'You have already registered' });
            }

            user = new User({
                name,
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();
            return res.json({ message: 'You have successfully registered' });
        }
        catch (err) {
            return res.status(500).json({ message: 'Server error' });
        }
    });

module.exports = router;