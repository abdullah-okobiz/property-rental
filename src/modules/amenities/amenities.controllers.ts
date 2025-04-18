import { NextFunction, Request, Response } from "express";
import logger from "../../configs/logger.configs";
import mongoose from "mongoose";
import AmenitiesServices from "./amenities.services";
import { IAmenitiesPayload } from "./amenities.interfaces";
const {
  processCreateAmenities,
  processDeleteAmenities,
  processRetrieveAllAmenities,
} = AmenitiesServices;
const AmenitiesControllers = {
  handleCreateAmenities: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const amenitiesImage = req?.file?.filename;
      const { amenitiesLabel } = req.body;
      const data = await processCreateAmenities({
        amenitiesImage,
        amenitiesLabel,
      } as IAmenitiesPayload);
      res.status(201).json({
        status: "success",
        message: "Amenities created successfully",
        data,
      });
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },

  handleRetrieveAllAmenities: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await processRetrieveAllAmenities();
      res.status(200).json({
        status: "success",
        message: "Amenities retrieve successful",
        data,
      });
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },

  handleDeleteAmenities: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { amenitiesImage } = req.amenities as IAmenitiesPayload;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ status: "error", message: "Invalid banner ID" });
        return;
      }

      const amenitiesId = new mongoose.Types.ObjectId(id);
      await processDeleteAmenities({ amenitiesId, amenitiesImage });

      res.status(200).json({
        status: "success",
        message: "Amenities deleted successfully",
      });
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },
};

export default AmenitiesControllers;
