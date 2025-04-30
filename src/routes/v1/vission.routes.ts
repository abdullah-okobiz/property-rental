import { Router } from "express";
import UserMiddlewares from "../../modules/user/user.middlewares";
import VissionControllers from "../../modules/vission/vission.controllers";
const { checkAccessToken, isAdmin } = UserMiddlewares;
const {
  handleCreateVission,
  handleDeleteVission,
  handleRetrieveAllVission,
  handleUpdateVission,
} = VissionControllers;

const router = Router();

router
  .route("/admin/vission")
  .post(checkAccessToken, isAdmin, handleCreateVission)
  .get( handleRetrieveAllVission);

router
  .route("/admin/vission/:id")
  .put(checkAccessToken, isAdmin, handleUpdateVission)
  .delete(checkAccessToken, isAdmin, handleDeleteVission);

export default router;
