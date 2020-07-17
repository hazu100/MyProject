const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ 'msg': 'No token found, Auth denied' });
    }
    try {
        const decoded = jwt.verify(token,config.get('myToken'));
        req.userId = decoded.userId;
        next();
    }
    catch (err) {
        return res.status(401).json({ 'msg': 'No token found' });
    }
}