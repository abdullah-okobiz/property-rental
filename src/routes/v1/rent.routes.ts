import { Router } from "express";
import UserMiddlewares from "../../modules/user/user.middlewares";
import RentControllers from "../../modules/rent/rent.controllers";
import upload from "../../middlewares/multer.middleware";

const { checkAccessToken, isHost } = UserMiddlewares;
const {
  handleInitializeRentListing,
  handleProgressCreatingRentListing,
  handleUploadImage,
  handleUnlinkImage,
  handleGetAllHostListedPropertiesForRent,
} = RentControllers;
const router = Router();

router
  .route("/host/rent/new")
  .post(checkAccessToken, isHost, handleInitializeRentListing);

router
  .route("/host/rent/:id")
  .patch(checkAccessToken, isHost, handleProgressCreatingRentListing);

router
  .route("/host/rent/upload")
  .post(checkAccessToken, isHost, upload.array("rentImages"), handleUploadImage)
  .delete(checkAccessToken, isHost, handleUnlinkImage);

router
  .route("/host/rent")
  .get(checkAccessToken, isHost, handleGetAllHostListedPropertiesForRent);

export default router;
