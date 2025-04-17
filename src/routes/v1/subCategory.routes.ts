import { Router } from "express";
import UserMiddlewares from "../../modules/user/user.middlewares";
import SubCategoryControllers from "../../modules/subCategory/subCategory.controllers";

const { checkAccessToken, isAdmin } = UserMiddlewares;
const {
  handleCreateSubCategory,
  handleDeleteSubCategory,
  handleRetrieveSubCategories,
  handleUpdateSubCategory,
} = SubCategoryControllers;
const router = Router();

router
  .route("/admin/sub_category")
  .post(checkAccessToken, isAdmin, handleCreateSubCategory)
  .get(handleRetrieveSubCategories);

router
  .route("/admin/sub_category/:id")
  .put(checkAccessToken, isAdmin, handleUpdateSubCategory)
  .delete(checkAccessToken, isAdmin, handleDeleteSubCategory);

export default router;
