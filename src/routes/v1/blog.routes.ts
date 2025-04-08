import { Router } from "express";
import UserMiddlewares from "../../modules/user/user.middlewares";
import upload from "../../middlewares/multer.middleware";
import BlogControllers from "../../modules/blog/blog.controllers";
const { checkAccessToken, isAdmin } = UserMiddlewares;
const { handleCreateBlog } = BlogControllers;
const router = Router();

router
  .route("/admin/blog")
  .post(
    checkAccessToken,
    isAdmin,
    upload.single("blogImage"),
    handleCreateBlog
  );

export default router;
