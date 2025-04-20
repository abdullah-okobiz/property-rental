import { Router } from "express";
import UserMiddlewares from "../../modules/user/user.middlewares";
import RentControllers from "../../modules/rent/rent.controllers";

const { checkAccessToken, isHost } = UserMiddlewares;
const { handleInitializeRentListing } = RentControllers;
const router = Router();

router
  .route("/host/rent/new")
  .post(checkAccessToken, isHost, handleInitializeRentListing);

router
  .route("/admin/sub_category/:id")
  .put(checkAccessToken, isHost)
  .delete(checkAccessToken, isHost);

export default router;
