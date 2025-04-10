import { Router } from "express";
import UserMiddlewares from "../../modules/user/user.middlewares";
import MissionControllers from "../../modules/mission/mission.controllers";
const { checkAccessToken, isAdmin } = UserMiddlewares;
const {
  handleCreateMission,
  handleDeleteMission,
  handleRetrieveAllMission,
  handleUpdateMission,
} = MissionControllers;

const router = Router();

router
  .route("/admin/mission")
  .post(checkAccessToken, isAdmin, handleCreateMission)
  .get(checkAccessToken, isAdmin, handleRetrieveAllMission);

router
  .route("/admin/mission/:id")
  .put(checkAccessToken, isAdmin, handleUpdateMission)
  .delete(checkAccessToken, isAdmin, handleDeleteMission);

export default router;
