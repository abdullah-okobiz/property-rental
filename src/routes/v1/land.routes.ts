import { Router } from "express";
import UserMiddlewares from "../../modules/user/user.middlewares";
import upload from "../../middlewares/multer.middleware";
import LandControllers from "../../modules/land/land.controllers";
import { UserRole } from "../../interfaces/jwtPayload.interfaces";

const { checkAccessToken, isHost, allowRole } = UserMiddlewares;
const {
  handleInitializeLandListing,
  handleUpdateLandListingField,
  handleUploadImage,
  handleUnlinkImage,
  handleGetAllHostListedLand,
  handleGetAllLand,
  handleDeleteListedLandItem,
  handleChangeStatus,
  handleCreateLand,
} = LandControllers;

const router = Router();

// HOST ROUTES
router
  .route("/host/land/initialize")
  .post(checkAccessToken, isHost, handleInitializeLandListing);
router
  .route("/host/create-new-land")
  .post(checkAccessToken, isHost, upload.array("images"), handleCreateLand);
router
  .route("/host/land/:id")
  .patch(checkAccessToken, isHost, handleUpdateLandListingField);
router
  .route("/host/land/image/:id")
  .patch(checkAccessToken, isHost, upload.array("images"), handleUploadImage);
router
  .route("/host/land/image/:id")
  .delete(checkAccessToken, isHost, handleUnlinkImage);
router
  .route("/host/land")
  .get(checkAccessToken, isHost, handleGetAllHostListedLand);

// COMMON GET ALL LISTED FLAT ENDPOINT
router.route("/land").get(handleGetAllLand);

// ADMIN ROUTES

router
  .route("/admin/land/:id")
  .patch(
    checkAccessToken,
    allowRole(UserRole.Admin, UserRole.ListingVerificationManager),
    handleChangeStatus
  )
  .delete(
    checkAccessToken,
    allowRole(UserRole.Admin, UserRole.ListingVerificationManager),
    handleDeleteListedLandItem
  );

export default router;
