import { Router } from "express";
import UserMiddlewares from "../../modules/user/user.middlewares";
import CategoryControllers from "../../modules/category/category.controllers";

const { checkAccessToken, isAdmin } = UserMiddlewares;
const { handleCreateCategory, handleUpdateCategory, handleRetriveCategories } =
  CategoryControllers;
const router = Router();

router
  .route("/admin/category")
  .post(checkAccessToken, isAdmin, handleCreateCategory)
  .get(checkAccessToken, isAdmin, handleRetriveCategories);
  
router
  .route("/admin/category/:id")
  .put(checkAccessToken, isAdmin, handleUpdateCategory)
  .delete(checkAccessToken, isAdmin,);

export default router;
