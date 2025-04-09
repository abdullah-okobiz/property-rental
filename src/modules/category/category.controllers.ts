import { NextFunction, Request, Response } from "express";
import logger from "../../configs/logger.configs";
import CategoryServices from "./category.services";
import { Types } from "mongoose";
import { ICategoryPayload } from "./category.interfaces";
const { processCreateCategory, processUpdateCategory, processRetriveCategory } =
  CategoryServices;
const CategoryControllers = {
  handleCreateCategory: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await processCreateCategory(req.body);
      res.status(201).json({
        status: "success",
        message: "Category create successful",
        data,
      });
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },
  handleUpdateCategory: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { categoryName, feature } = req.body;
      if (!Types.ObjectId.isValid(id)) {
        res
          .status(400)
          .json({ status: "error", message: "Invalid category ID" });
        return;
      }
      const categoryId = new Types.ObjectId(id);
      const data = await processUpdateCategory({
        categoryId,
        categoryName,
        feature,
      });
      res.status(200).json({
        status: "success",
        message: "Category update successful",
        data,
      });
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },
  handleRetriveCategories: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { feature_id } = req.query;
      const id = new Types.ObjectId(feature_id as string);
      let payload: ICategoryPayload = {};
      if (!Types.ObjectId.isValid(id)) {
        res
          .status(400)
          .json({ status: "error", message: "Invalid feature ID" });
        return;
      }
      if (feature_id) {
        payload = { feature: id };
      }
      const data = await processRetriveCategory(payload);
      res.status(200).json({
        status: "success",
        message: "Category update successful",
        data,
      });
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },
};

export default CategoryControllers;
