import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "./../models/user.js";
import { jwtSecret, refreshTokenExpiry, refreshTokenSecret, sessionExpiry } from "./../configs/configs.js";
import jwt from "jsonwebtoken";

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtSecret;

passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload._id)
        .then(user => {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        })
        .catch(err => {
            return done(err, false);
        })
    })
)

export const cookieOption = {
    httpOnly: true,
    secure: true,
    signed: true,
    maxAge: eval(refreshTokenExpiry) * 1000,
    sameSite: "none"
}

export const getToken = (user) => {
    return jwt.sign(user, jwtSecret, { 
        expiresIn: eval(sessionExpiry) 
    });
}

export const getRefreshToken = (user) => {
    return jwt.sign( user, refreshTokenSecret, {
        expiresIn: eval(refreshTokenExpiry)
    });
}

export const verifyUserJwt = passport.authenticate("jwt", { session: false });
export const verifyUserLocal = passport.authenticate("local", { session: false });

export default passport;