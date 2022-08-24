import { Router } from 'express';
import { signup, login, refreshToken, verify, logout } from './../controllers/userControllers.js';
import { verifyUserLocal, verifyUserJwt } from './../passport/passport.js';

const router = Router();

router.post("/signup", signup);
router.post("/login", verifyUserLocal, login);
router.post("/refreshToken", refreshToken);
router.get("/verify", verifyUserJwt, verify);
router.get("/logout", verifyUserJwt, logout);

export default router;