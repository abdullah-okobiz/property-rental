import { Router } from "express";
import AmenitiesControllers from "../../modules/amenities/amenities.controllers";
import UserMiddlewares from "../../modules/user/user.middlewares";
import AmenitiesMiddlewares from "../../modules/amenities/amenities.middlewares";
import upload from "../../middlewares/multer.middleware";
const { checkAccessToken, isAdmin } = UserMiddlewares;
const { isAmenitiesExist } = AmenitiesMiddlewares;
const {
  handleCreateAmenities,
  handleDeleteAmenities,
  handleRetrieveAllAmenities,
} = AmenitiesControllers;
const router = Router();

router
  .route("/admin/amenities")
  .get(handleRetrieveAllAmenities)
  .post(checkAccessToken, isAdmin,upload.single("amenitiesImage"), handleCreateAmenities);
router
  .route("/admin/amenities/:id")
  .delete(checkAccessToken, isAdmin, isAmenitiesExist, handleDeleteAmenities);

export default router;
