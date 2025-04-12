import { Router } from "express";
import UserMiddlewares from "../../modules/user/user.middlewares";
import UserControllers from "../../modules/user/user.controllers";

const router = Router();

const {
  signupInputValidation,
  isSignupUserExist,
  isUserExist,
  checkVerificationOtp,
  checkAccessToken,
  checkRefreshToken,
  checkPassword,
  checkRole,
} = UserMiddlewares;
const {
  handleSignup,
  handleVerify,
  handleLogin,
  handleCheck,
  handleRefreshTokens,
  handleLogout,
  handleDeleteUser,
  handleResend,
} = UserControllers;

router
  .route("/signup")
  .post(signupInputValidation, isSignupUserExist, handleSignup);
router.route("/verify").post(checkVerificationOtp, handleVerify);
router.route("/resend").post(isUserExist, handleResend);
router.route("/login").post(isUserExist, checkPassword, handleLogin);
router
  .route("/admin/login")
  .post(isUserExist, checkRole, checkPassword, handleLogin);
router.route("/refresh").post(checkRefreshToken, handleRefreshTokens);
router.route("/check").post(checkAccessToken, handleCheck);
router.route("/logout").post(checkAccessToken, handleLogout);
router.route("/delete").post(checkAccessToken, handleDeleteUser);
export default router;
