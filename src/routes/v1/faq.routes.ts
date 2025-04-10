import { Router } from "express";
import UserMiddlewares from "../../modules/user/user.middlewares";
import FaqControllers from "../../modules/faq/faq.controllers";
const { checkAccessToken, isAdmin } = UserMiddlewares;
const {
  handleCreateFaq,
  handleDeleteFaq,
  handleRetrieveAllFaq,
  handleUpdateFaq,
} = FaqControllers;

const router = Router();

router
  .route("/admin/faq")
  .post(checkAccessToken, isAdmin, handleCreateFaq)
  .get(checkAccessToken, isAdmin, handleRetrieveAllFaq);

router
  .route("/admin/faq/:id")
  .put(checkAccessToken, isAdmin, handleUpdateFaq)
  .delete(checkAccessToken, isAdmin, handleDeleteFaq);

export default router;
