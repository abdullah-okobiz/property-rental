import { Router } from "express";
import UserMiddlewares from "../../modules/user/user.middlewares";
import ProfileControllers from "../../modules/profile/profile.controllers";

const router = Router();
const { checkAccessToken } = UserMiddlewares;
const {
  handleCreateWorksAt,
  handleGetWorksAt,
  handleCreateLocation,
  handleGetLocation,
} = ProfileControllers;

router.route("/profile/work").patch(checkAccessToken, handleCreateWorksAt);
router.route("/profile/work").get(checkAccessToken, handleGetWorksAt);
router.route("/profile/location").patch(checkAccessToken, handleCreateLocation);
router.route("/profile/location").get(checkAccessToken, handleGetLocation);

export default router;
