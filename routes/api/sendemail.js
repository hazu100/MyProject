const express = require('express');
const nodemailer = require('nodemailer');
const jwt = require('jwt-simple');
const { check, validationResult } = require('express-validator');
const User = require('../../model/user'); 

const router = express.Router();

router.post('/', [
        check('recoveryMailId', 'Please provide a valid email ID')
        .isEmail(),
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { recoveryMailId } = req.body;

        try {
            let user = await User.findOne({ email: recoveryMailId });
            if (!user) {
                return res.status(400).json({ errors: [{ message: 'You are not registered' }] });
            }
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.FROM_MAIL_USERNAME,
                    pass: process.env.FROM_MAIL_PASSWORD
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            const token = jwt.encode({ resetPassUserId: user.id },
                user.password
            );
            
            const mailOptions = {
                to: recoveryMailId,
                from: process.env.FROM_MAIL_USERNAME,
                subject: 'MyProject Password Reset',
                text: `Hi ${user.name},\n\n
                    You are receiving this because you (or someone else) have requested the reset of the password for your account.\n
                    Please click on the following link, or paste this into your browser to complete the process:\n
                    https://${req.headers.host}/reset?user=${user.id}&token=${token} \n'
                    If you did not request this, please ignore this email and your password will remain unchanged.\n`
            };

            transporter.sendMail(mailOptions, (err, response) => {
                if (err) { console.log(err.message) } else {
                    transporter.close(); // shut down the connection pool, no more messages
                    return res.json({ message: 'Email Sent', statusCode: 200 });
                }
            });

        } catch (err) {
            return res.status(500).json({ message: 'Server error' });
        }
    });

module.exports = router;