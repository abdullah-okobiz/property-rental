import { Router } from "express";
import UserMiddlewares from "../../modules/user/user.middlewares";
import WhyChooseUsControllers from "../../modules/whyChooseUs/whyChooseUs.controllers";
import { UserRole } from "../../interfaces/jwtPayload.interfaces";
const { checkAccessToken, allowRole } = UserMiddlewares;
const {
  handleCreateWhyChooseUs,
  handleDeleteWhyChooseUs,
  handleRetrieveAllWhyChooseUs,
  handleUpdateWhyChooseUs,
} = WhyChooseUsControllers;

const router = Router();

router
  .route("/admin/why-choose-us")
  .post(
    checkAccessToken,
    allowRole(UserRole.Admin, UserRole.ContentManager),
    handleCreateWhyChooseUs
  )
  .get(handleRetrieveAllWhyChooseUs);

router
  .route("/admin/why-choose-us/:id")
  .put(
    checkAccessToken,
    allowRole(UserRole.Admin, UserRole.ContentManager),
    handleUpdateWhyChooseUs
  )
  .delete(
    checkAccessToken,
    allowRole(UserRole.Admin, UserRole.ContentManager),
    handleDeleteWhyChooseUs
  );

export default router;
