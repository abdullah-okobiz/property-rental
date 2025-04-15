import { Router } from "express";
import UserMiddlewares from "../../modules/user/user.middlewares";
import upload from "../../middlewares/multer.middleware";
import BlogControllers from "../../modules/blog/blog.controllers";
import BlogMiddlewares from "../../modules/blog/blog.middlewares";
const { checkAccessToken, isAdmin } = UserMiddlewares;
const { handleCreateBlog, handleUpdateBlog } = BlogControllers;
const { isTeamMemberExist } = BlogMiddlewares;
const router = Router();

router
  .route("/admin/blog")
  .post(
    checkAccessToken,
    isAdmin,
    upload.single("blogImage"),
    handleCreateBlog
  );

router
  .route("/admin/blog/:id")
  .put(
    checkAccessToken,
    isAdmin,
    isTeamMemberExist,
    upload.single("blogImage"),
    handleUpdateBlog
  )
  .delete(checkAccessToken, isAdmin, isTeamMemberExist);

export default router;
