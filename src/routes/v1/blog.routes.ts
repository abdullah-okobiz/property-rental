import { Router } from "express";
import UserMiddlewares from "../../modules/user/user.middlewares";
import upload from "../../middlewares/multer.middleware";
import BlogControllers from "../../modules/blog/blog.controllers";
import BlogMiddlewares from "../../modules/blog/blog.middlewares";
const { checkAccessToken, isAdmin } = UserMiddlewares;
const {
  handleCreateBlog,
  handleUpdateBlog,
  handleBlogDelete,
  handleRetrieveBlog,
  handleRetrieveSingleBlog,
} = BlogControllers;
const { isBlogExist } = BlogMiddlewares;
const router = Router();

router
  .route("/admin/blog")
  .get(handleRetrieveBlog)
  .post(
    checkAccessToken,
    isAdmin,
    upload.single("blogImage"),
    handleCreateBlog
  );

router
  .route("/admin/blog/:id")
  .get(handleRetrieveSingleBlog)
  .put(
    checkAccessToken,
    isAdmin,
    isBlogExist,
    upload.single("blogImage"),
    handleUpdateBlog
  )
  .delete(checkAccessToken, isAdmin, isBlogExist, handleBlogDelete);

export default router;
