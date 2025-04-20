import { Router } from "express";
import UserMiddlewares from "../../modules/user/user.middlewares";
import RentControllers from "../../modules/rent/rent.controllers";
import upload from "../../middlewares/multer.middleware";

const { checkAccessToken, isHost } = UserMiddlewares;
const {
  handleInitializeRentListing,
  handleProgressCreatingRentListing,
  handleUploadImage,
} = RentControllers;
const router = Router();

router
  .route("/host/rent/new")
  .post(checkAccessToken, isHost, handleInitializeRentListing);

router
  .route("/host/rent/new/:id")
  .patch(checkAccessToken, isHost, handleProgressCreatingRentListing);

router
  .route("/host/rent/upload")
  .post(
    checkAccessToken,
    isHost,
    upload.array("rentImages"),
    handleUploadImage
  );

router
  .route("/admin/sub_category/:id")
  .put(checkAccessToken, isHost)
  .delete(checkAccessToken, isHost);

export default router;
