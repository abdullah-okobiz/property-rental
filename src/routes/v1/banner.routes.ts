import { Router } from "express";
import UserMiddlewares from "../../modules/user/user.middlewares";
import upload from "../../middlewares/multer.middleware";
import BannerControllers from "../../modules/banner/banner.controllers";

const { checkAccessToken, isAdmin } = UserMiddlewares;
const { handleCreateBanner, handleDeleteBanner, handleRetrieveAllBanner } =
  BannerControllers;

const router = Router();

router
  .route("/admin/banner")
  .post(
    checkAccessToken,
    isAdmin,
    upload.single("bannerImage"),
    handleCreateBanner
  )
  .get(checkAccessToken, isAdmin, handleRetrieveAllBanner);

router
  .route("/admin/banner/:id")
  .delete(checkAccessToken, isAdmin, handleDeleteBanner);

export default router;
