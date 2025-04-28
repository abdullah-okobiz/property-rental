import { NextFunction, Request, Response } from "express";
import logger from "../../configs/logger.configs";
import mongoose from "mongoose";
import { documentPerPage } from "../../const";
import FlatServices from "./flat.services";
import { IFlatImagesPath } from "./flat.interfaces";

const {
  processInitializeFlatListing,
  processUpdateFlatListing,
  processUploadImage,
  processUnlinkImage,
  processHostListedFlatProperties,
} = FlatServices;

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
  handleUploadImage: async (
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
      const flatId = new mongoose.Types.ObjectId(id);
      const images = (req?.files as IFlatImagesPath[])?.map(
        (item) => item.filename
      );
      const data = await processUploadImage({ flatId, images });
      res.status(200).json({
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
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res
          .status(400)
          .json({ status: "error", message: "Invalid feature ID" });
        return;
      }
      const flatId = new mongoose.Types.ObjectId(id);
      const { images, imageUrl } = req.body;
      await processUnlinkImage({
        flatId,
        images,
        singleImage: imageUrl as string,
      });
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
  handleGetAllHostListedPropertiesForRent: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.authenticateTokenDecoded;
      const host = userId;
      const data = await processHostListedFlatProperties({ userId: host });
      res.status(200).json({
        status: "success",
        message: "Listed Properties For Flat Retrieve successful",
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
