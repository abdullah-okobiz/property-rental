import { Router } from "express";
import UserMiddlewares from "../../modules/user/user.middlewares";
import upload from "../../middlewares/multer.middleware";
import FlatControllers from "../../modules/flat/flat.controllers";

const { checkAccessToken, isHost, isAdmin } = UserMiddlewares;
const {
  handleInitializeFlatListing,
  handleUpdateFlatListingField,
  handleUploadImage,
  handleUnlinkImage,
  handleGetAllHostListedPropertiesForRent,
  handleGetAllFlat,
  handleChangeStatus,
  handleDeleteListedFlatItem,
} = FlatControllers;

const router = Router();

// HOST ROUTES
router
  .route("/host/flat/initialize")
  .post(checkAccessToken, isHost, handleInitializeFlatListing);
router
  .route("/host/flat/:id")
  .patch(checkAccessToken, isHost, handleUpdateFlatListingField);
router
  .route("/host/flat/image/:id")
  .patch(checkAccessToken, isHost, upload.array("images"), handleUploadImage);
router
  .route("/host/flat/image/:id")
  .delete(checkAccessToken, isHost, handleUnlinkImage);
router
  .route("/host/flat")
  .get(checkAccessToken, isHost, handleGetAllHostListedPropertiesForRent);

// COMMON GET ALL LISTED FLAT ENDPOINT
router.route("/flat").get(handleGetAllFlat);

// ADMIN ROUTES

router
  .route("/admin/flat/:id")
  .patch(checkAccessToken, isAdmin, handleChangeStatus)
  .delete(checkAccessToken, isAdmin, handleDeleteListedFlatItem);

export default router;
