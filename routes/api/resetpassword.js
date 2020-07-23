const express = require('express');
const nodemailer = require('nodemailer');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const User = require('../../model/user');

const router = express.Router();

router.put('/:userId/:token', [
    check('newPassword', 'Please provide a password with 6 or more characters')
        .isLength({ min: 6 })
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { newPassword } = req.body;
        const { userId, token } = req.params;

        try {
            let user = await User.findById(userId);
            if (!user) {
                return res.status(400).json({ errors: [{ message: 'Something went wrong!' }] });
            }

            const decodedToken = jwt.decode(token, user.password);
            if (decodedToken.resetPassUserId === user.id) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(newPassword, salt);
                await user.save();
                return res.json({ message: 'Password successfully updated', statusCode: 200 });
            }
            return res.status(400).json({ errors: [{ message: 'Something went wrong!' }] });

        } catch (err) {
            return res.status(500).json({ message: 'Server error' });
        }
    });

module.exports = router;