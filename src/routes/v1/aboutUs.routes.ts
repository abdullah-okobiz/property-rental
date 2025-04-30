import { Router } from "express";
import UserMiddlewares from "../../modules/user/user.middlewares";
import AboutUsControllers from "../../modules/aboutUs/aboutUs.controllers";

const { checkAccessToken, isAdmin } = UserMiddlewares;
const {
  handleCreateAboutUs,
  handleDeleteAboutUs,
  handleRetriveAboutUs,
  handleUpdateAboutUs,
} = AboutUsControllers;

const router = Router();

router
  .route("/admin/about_us")
  .post(checkAccessToken, isAdmin, handleCreateAboutUs)
  .get(handleRetriveAboutUs);

router
  .route("/admin/about_us/:id")
  .put(checkAccessToken, isAdmin, handleUpdateAboutUs)
  .delete(checkAccessToken, isAdmin, handleDeleteAboutUs);
export default router;
