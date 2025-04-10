import { Router } from "express";
import UserMiddlewares from "../../modules/user/user.middlewares";
import PartnerControllers from "../../modules/partner/partner.controllers";
import upload from "../../middlewares/multer.middleware";

const { checkAccessToken, isAdmin } = UserMiddlewares;
const {
  handleCreatePartner,
  handleDeletePartner,
  handleRetrieveAllPartner,
  handleUpdatePartner,
} = PartnerControllers;

const router = Router();

router
  .route("/admin/partner")
  .post(
    checkAccessToken,
    isAdmin,
    upload.single("partnerImage"),
    handleCreatePartner
  )
  .get(checkAccessToken, isAdmin, handleRetrieveAllPartner);

router
  .route("/admin/partner/:id")
  .put(checkAccessToken, isAdmin, upload.single("partnerImage"), handleUpdatePartner)
  .delete(checkAccessToken, isAdmin, handleDeletePartner);

export default router;
