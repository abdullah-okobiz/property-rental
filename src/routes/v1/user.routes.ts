import { Router } from "express";
import UserMiddlewares from "../../modules/user/user.middlewares";
import UserControllers from "../../modules/user/user.controllers";

const router = Router();

const {
  signupInputValidation,
  isSignupUserExist,
  isUserExistAndVerified,
  isUserExist,
  checkVerificationOtp,
  checkAccessToken,
  checkRefreshToken,
  checkPassword,
  checkRole,
  isAdmin,
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
router.route("/login").post(isUserExistAndVerified, checkPassword, handleLogin);
router
  .route("/admin/login")
  .post(isUserExistAndVerified, checkRole, checkPassword, handleLogin);
router.route("/refresh").post(checkRefreshToken, handleRefreshTokens);
router.route("/check").post(checkAccessToken, handleCheck);
router.route("/logout").post(checkAccessToken, handleLogout);
router
  .route("/admin/users/:id")
  .delete(checkAccessToken, isAdmin, handleDeleteUser);
export default router;
