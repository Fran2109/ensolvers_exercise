import User from './../models/user.js';
import { getToken, cookieOption, getRefreshToken } from './../passport/passport.js';
import jwt from 'jsonwebtoken';
import { refreshTokenSecret } from './../configs/configs.js';
import { faker } from '@faker-js/faker';

export const signup = (req, res, next) => {
    if(!req.body.firstName) {
        res.status(500).json({
            name: "FirstNameError",
            message: "First name is required"
        })
    } else {
        User.register(
            new User({ username: req.body.username }),
            req.body.password,
            (err, user) => {
                if(err) {
                    res.status(500).json({
                        name: "SignupError",
                        message: err.message
                    })
                } else {
                    user.firstName = req.body.firstName;
                    user.lastName = req.body.lastName;
                    user.age = req.body.age;
                    user.icon = !req.body.icon ? faker.image.avatar() : req.body.icon;
                    const token = getToken({ _id: user._id });
                    const refreshToken = getRefreshToken({ _id: user._id });
                    user.refreshToken.push({ refreshToken });
                    user.save((err, user) => {
                        if(err) {
                            res.status(500).json({
                                name: "SignupError",
                                message: err.message
                            })
                        } else {
                            res.cookie("refreshToken", refreshToken, cookieOption);
                            res.status(200).json({
                                success: true,
                                token: token,
                            })
                        }
                    })
                }
            }
        )
    }
}

export const login = (req, res, next) => {
    const token = getToken({ _id: req.user._id });
    const refreshToken = getRefreshToken({ _id: req.user._id });
    User.findById(req.user._id, (err, user) => {
        if(err) {
            res.status(500).json({
                name: "LoginError",
                message: err.message
            })
        } else {
            user.refreshToken.push({ refreshToken });
            user.save((err, user) => {
                if(err) {
                    res.status(500).json({
                        name: "LoginError",
                        message: err.message
                    })
                } else {
                    res.cookie("refreshToken", refreshToken, cookieOption);
                    res.status(200).json({
                        success: true,
                        token: token,
                    })
                }
            })
        }
    })
}

export const refreshToken = (req, res, next) => {
    const { signedCookies = {} } = req;
    const { refreshToken } = signedCookies;
    if(refreshToken) {
        try{
            const payload = jwt.verify(refreshToken, refreshTokenSecret);
            const userId = payload._id;
            User.findById({ _id: userId }, (err, user) => {
                if(user) {
                    const tokenIndex = user.refreshToken.findIndex(token => token.refreshToken === refreshToken);
                    if(tokenIndex === -1) {
                        res.status(401).json({
                            name: "RefreshTokenError",
                            message: "Refresh token is invalid"
                        })
                    } else {
                        const token = getToken({ _id: userId });
                        const newRefreshToken = getRefreshToken({ _id: userId });
                        user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken };
                        user.save((err, user) => {
                            if(err) {
                                res.status(500).json({
                                    name: "RefreshTokenError",
                                    message: err.message
                                })
                            } else {
                                res.cookie("refreshToken", newRefreshToken, cookieOption);
                                res.status(200).json({
                                    success: true,
                                    token: token,
                                })
                            }
                        })
                    }
                } else {
                    res.status(401).json({
                        name: "RefreshTokenError",
                        message: "Refresh token is invalid"
                    })
                }
                if(err){
                    res.status(500).json({
                        name: "RefreshTokenError",
                        message: err.message
                    })
                }
            })
        } catch(err) {
            res.status(401).json({
                name: "RefreshTokenError",
                message: err.message
            })
        }
    } else {
        res.status(401).json({
            name: "RefreshTokenError",
            message: "Refresh token is invalid"
        })
    }
}

export const verify = (req, res, next) => {
    res.status(200).json({
        success: req.isAuthenticated(),
        user: req.user
    })
}

export const logout = (req, res, next) => {
    const { signedCookies = {} } = req;
    const { refreshToken } = signedCookies;
    User.findById(req.user._id, (err, user) => {
        if(user) {
            const tokenIndex = user.refreshToken.findIndex(token => token.refreshToken === refreshToken);
            if(tokenIndex === -1) {
                res.status(401).json({
                    name: "LogoutError",
                    message: "Logout failed"
                })
            } else {
                user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove();

                user.save((err, user) => {
                    if(err) {
                        res.status(500).json({
                            name: "LogoutError",
                            message: err.message
                        })
                    } else {
                        res.clearCookie("refreshToken", cookieOption);
                        res.status(200).json({
                            success: true,
                        })
                    }
                })
            }
        } else {
            res.status(401).json({
                name: "LogoutError",
                message: "Logout failed"
            })
        }
        if(err) {
            res.status(500).json({
                name: "LogoutError",
                message: err.message
            })
        }
    })
}