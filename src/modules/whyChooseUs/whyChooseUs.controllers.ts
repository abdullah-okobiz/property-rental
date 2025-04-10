import { NextFunction, Request, Response } from "express";
import logger from "../../configs/logger.configs";
import mongoose from "mongoose";
import WhyChooseUsServices from "./whyChooseUs.services";

const {
  processCreateWhyChooseUs,
  processDeleteWhyChooseUs,
  processRetrieveAllWhyChooseUs,
  processUpdateWhyChooseUs,
} = WhyChooseUsServices;

const WhyChooseUsControllers = {
  handleCreateWhyChooseUs: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await processCreateWhyChooseUs(req.body);
      res.status(201).json({
        status: "success",
        message: "WhyChooseUs created successfully",
        data,
      });
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },

  handleRetrieveAllWhyChooseUs: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await processRetrieveAllWhyChooseUs();
      res.status(200).json({
        status: "success",
        message: "WhyChooseUs retrieved successfully",
        data,
      });
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },

  handleUpdateWhyChooseUs: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { whyChooseUsTitle, whyChooseUsDescription } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res
          .status(400)
          .json({ status: "error", message: "Invalid WhyChooseUs ID" });
        return;
      }

      const whyChooseUsId = new mongoose.Types.ObjectId(id);
      const data = await processUpdateWhyChooseUs({
        whyChooseUsId,
        whyChooseUsTitle,
        whyChooseUsDescription,
      });

      res.status(200).json({
        status: "success",
        message: "WhyChooseUs updated successfully",
        data,
      });
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },

  handleDeleteWhyChooseUs: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res
          .status(400)
          .json({ status: "error", message: "Invalid WhyChooseUs ID" });
        return;
      }

      const whyChooseUsId = new mongoose.Types.ObjectId(id);
      const data = await processDeleteWhyChooseUs({ whyChooseUsId });

      res.status(200).json({
        status: "success",
        message: "WhyChooseUs deleted successfully",
        data,
      });
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },
};

export default WhyChooseUsControllers;
