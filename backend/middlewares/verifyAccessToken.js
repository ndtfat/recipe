const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const userAccessToken = req.headers.token.split(' ')[1];

    if (userAccessToken) {
        jwt.verify(userAccessToken, process.env.ACCESS_TOKEN_KEY, (err, user) => {
            if (err) return res.status(403).json({ status: 403, message: 'Invalid access_token', err });
            else {
                req.user = user;
                next();
            }
        });
    } else return res.status(401).json({ status: 401, message: "You're not login" });
};
