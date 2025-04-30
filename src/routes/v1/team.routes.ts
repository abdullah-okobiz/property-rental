import { Router } from "express";
import UserMiddlewares from "../../modules/user/user.middlewares";
import upload from "../../middlewares/multer.middleware";
import TeamControllers from "../../modules/team/team.controllers";
import TeamMiddlewares from "../../modules/team/team.middlewares";

const { checkAccessToken, isAdmin } = UserMiddlewares;
const { isTeamMemberExist } = TeamMiddlewares;
const {
  handleCreateTeamMember,
  handleDeleteTeamMember,
  handleRetrieveAllTeamMembers,
  handleUpdateOneTeamMember,
} = TeamControllers;

const router = Router();

router
  .route("/admin/team")
  .post(
    checkAccessToken,
    isAdmin,
    upload.single("teamMemberImage"),
    handleCreateTeamMember
  )
  .get(handleRetrieveAllTeamMembers);

router
  .route("/admin/team/:id")
  .put(
    checkAccessToken,
    isAdmin,
    isTeamMemberExist,
    upload.single("teamMemberImage"),
    handleUpdateOneTeamMember
  )
  .delete(checkAccessToken, isAdmin, isTeamMemberExist, handleDeleteTeamMember);

export default router;
