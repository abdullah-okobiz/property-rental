import { Router } from "express";
import UserMiddlewares from "../../modules/user/user.middlewares";
import WhyChooseUsControllers from "../../modules/whyChooseUs/whyChooseUs.controllers";
const { checkAccessToken, isAdmin } = UserMiddlewares;
const {
  handleCreateWhyChooseUs,
  handleDeleteWhyChooseUs,
  handleRetrieveAllWhyChooseUs,
  handleUpdateWhyChooseUs,
} = WhyChooseUsControllers;

const router = Router();

router
  .route("/admin/why-choose-us")
  .post(checkAccessToken, isAdmin, handleCreateWhyChooseUs)
  .get(checkAccessToken, isAdmin, handleRetrieveAllWhyChooseUs);

router
  .route("/admin/why-choose-us/:id")
  .put(checkAccessToken, isAdmin, handleUpdateWhyChooseUs)
  .delete(checkAccessToken, isAdmin, handleDeleteWhyChooseUs);

export default router;
