import { Router } from "express";
import FlatBookingControllers from "../../modules/flatbooking/flatbooking.controllers";
import UserMiddlewares from "../../modules/user/user.middlewares";
import { UserRole } from "../../interfaces/jwtPayload.interfaces";

const { checkAccessToken, allowRole } = UserMiddlewares;
 const {handleCreateFlatBooking,handleGetAllFlatBookings}=FlatBookingControllers

const router = Router();

router
  .route("/flat/booking")
  .post(checkAccessToken, handleCreateFlatBooking);

router
  .route("/admin/flat/bookings")
  .get(checkAccessToken, allowRole(UserRole.Admin), handleGetAllFlatBookings);

export default router;
