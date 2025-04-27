import { NextFunction, Request, Response } from "express";
import logger from "../../configs/logger.configs";
import mongoose from "mongoose";
import { documentPerPage } from "../../const";
import FlatServices from "./flat.services";

const { processInitializeFlatListing, processUpdateFlatListing } = FlatServices;

const FlatControllers = {
  handleInitializeFlatListing: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.authenticateTokenDecoded;
      const data = await processInitializeFlatListing({ userId });
      res.status(201).json({
        status: "success",
        message: "new flat listing initialized",
        data,
      });
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },
  handleUpdateFlatListingField: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res
          .status(400)
          .json({ status: "error", message: "Invalid feature ID" });
        return;
      }
      const reqBody = req.body;
      const flatId = new mongoose.Types.ObjectId(id);
      const data = await processUpdateFlatListing({ flatId, reqBody });
      res.status(200).json({
        status: "success",
        message: "new flat listing initialized",
        data,
      });
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },
};

export default FlatControllers;
