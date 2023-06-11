const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

let refreshTokenStore = [];

const generateAccessToken = (data) => {
    return jwt.sign(data, process.env.ACCESS_TOKEN_KEY, { expiresIn: '15m' });
};

const generateRefreshToken = (data) => {
    return jwt.sign(data, process.env.REFRESH_TOKEN_KEY, { expiresIn: '3d' });
};

const writeCookie = (res, key, value) => {
    return res.cookie(key, value, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
    });
};

class authController {
    // [POST] /auth/register
    async register(req, res) {
        let newUser;
        console.log(req.body.username + ' register');
        await bcrypt
            .hash(req.body.password, 10)
            .then((password) => (newUser = new UserModel({ ...req.body, password })))
            .catch((err) => console.log(err));

        newUser
            .save()
            .then((data) =>
                res.status(200).json({ status: 200, message: 'Registration successful', data: { ...data._doc } }),
            )
            .catch((err) => {
                if (err.hasOwnProperty('keyPattern')) {
                    if (err.keyValue.hasOwnProperty('username'))
                        return res.status(403).json({ status: 403, message: 'Username is used' });
                    else return res.status(403).json({ status: 403, message: 'Email is used' });
                }
                return res.status(500).json({ status: 500, message: err.message });
            });
    }

    // [POST] /auth/login
    async login(req, res) {
        console.log(req.body.username + ' login');
        const user = await UserModel.findOne({ username: req.body.username });
        let isValid = false;
        if (user) {
            isValid = await bcrypt.compare(req.body.password, user.password);
        }

        if (isValid) {
            const { password, createdAt, updatedAt, saved_recipes, ...other } = user._doc;
            const accessToken = generateAccessToken(other);
            const refreshToken = generateRefreshToken(other);

            refreshTokenStore.push(refreshToken);

            writeCookie(res, 'refresh_token', refreshToken);

            return res.status(200).json({ status: 200, message: 'login successful', data: { ...other, accessToken } });
        } else {
            return res.status(403).json({ status: 403, message: 'Invalid username/password' });
        }
    }

    // [POST] /auth/logout
    logout(req, res) {
        res.clearCookie('refresh_token');
        refreshTokenStore.filter((token) => token !== req.cookies.refresh_token);

        console.log('user logout');
        return res.status(200).json({ status: 200, message: 'Logout successful' });
    }

    // [POST] /auth/refresh-access-token
    async refreshAccessToken(req, res) {
        const refreshToken = req.cookies.refresh_token;
        // console.log('refresh token: ', refreshTokenStore.include(refreshToken));

        if (!refreshToken) return res.status(403).json({ status: 403, message: "You're not log in" });

        if (!refreshTokenStore.includes(refreshToken)) {
            return res.status(403).json({ status: 403, message: 'Invalid refresh_token' });
        }

        const userData = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
        const { exp, iat, ...userPayload } = userData;

        const newAccessToken = generateAccessToken(userPayload);
        const newRefreshToken = generateRefreshToken(userPayload);

        refreshTokenStore.filter((token) => token !== refreshToken);
        refreshTokenStore.push(newRefreshToken);

        writeCookie(res, 'refresh_token', newRefreshToken);

        return res.status(200).json({
            status: 200,
            message: 'refresh successful',
            data: { ...userPayload, accessToken: newAccessToken },
        });
    }
}

module.exports = new authController();
