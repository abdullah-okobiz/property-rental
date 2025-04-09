import { Router } from "express";
import UserMiddlewares from "../../modules/user/user.middlewares";
import FeatureControllers from "../../modules/feature/feature.controllers";
const { checkAccessToken, isAdmin } = UserMiddlewares;
const {
  handleCreateFeature,
  handleRetrieveAllFeature,
  handleUpdateFeature,
  handleDeleteFeature,
} = FeatureControllers;

const router = Router();

router
  .route("/admin/feature")
  .post(checkAccessToken, isAdmin, handleCreateFeature);
router
  .route("/admin/feature")
  .get(checkAccessToken, isAdmin, handleRetrieveAllFeature);

router
  .route("/admin/feature/:id")
  .put(checkAccessToken, isAdmin, handleUpdateFeature);
router
  .route("/admin/feature/:id")
  .delete(checkAccessToken, isAdmin, handleDeleteFeature);

export default router;
