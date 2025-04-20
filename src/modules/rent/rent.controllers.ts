import { NextFunction, Request, Response } from "express";
import logger from "../../configs/logger.configs";
import { IUser } from "../user/user.interfaces";
import RentServices from "./rent.services";
import { Types } from "mongoose";
const { processInitializeRentListing } = RentServices;
const RentControllers = {
  handleInitializeRentListing: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.authenticateTokenDecoded;
      const data = await processInitializeRentListing({
        host: userId,
      });
      res.status(201).json({
        status: "success",
        message: "new rent listing initialized",
        data,
      });
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },
};

export default RentControllers;
