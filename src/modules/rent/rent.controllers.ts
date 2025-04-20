import { NextFunction, Request, Response } from "express";
import logger from "../../configs/logger.configs";
import RentServices from "./rent.services";
import mongoose from "mongoose";
import { IRentImagesPath } from "./rent.interfaces";

const {
  processInitializeRentListing,
  processProgressRentListing,
  processUploadImage,
  processUnlinkImage,
} = RentServices;
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
  handleProgressCreatingRentListing: async (
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
      const rentId = new mongoose.Types.ObjectId(id);
      const payload = req.body;
      const data = await processProgressRentListing({
        rentId,
        payload,
      });
      res.status(200).json({
        status: "success",
        message: "New Field Data Added",
        data,
      });
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },
  handleUploadImage: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const images = (req?.files as IRentImagesPath[])?.map(
        (item) => item.filename
      );
      const data = processUploadImage({ images });
      res.status(201).json({
        status: "success",
        message: "Image upload successful",
        data,
      });
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },
  handleUnlinkImage: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { imageUrl } = req.query;
      await processUnlinkImage({ singleImage: imageUrl as string });
      res.status(200).json({
        status: "success",
        message: "Image delete successful",
      });
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },
};

export default RentControllers;
