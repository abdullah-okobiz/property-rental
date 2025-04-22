import { NextFunction, Request, Response } from "express";
import logger from "../../configs/logger.configs";
import RentServices from "./rent.services";
import mongoose from "mongoose";
import IRent, { IRentImagesPath } from "./rent.interfaces";
import { documentPerPage } from "../../const";

const {
  processInitializeRentListing,
  processProgressRentListing,
  processUploadImage,
  processUnlinkImage,
  processHostListedRentProperties,
  processChangeStatus,
  processGetApprovedRentListedItems,
  processDeleteListedRentItem,
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
      const { status } = req.body;
      if (status) {
        res.status(403).json({
          status: "error",
          message: "You are not allowed to modify the status field.",
        });
      }
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
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res
          .status(400)
          .json({ status: "error", message: "Invalid feature ID" });
        return;
      }
      const rentId = new mongoose.Types.ObjectId(id);
      const images = (req?.files as IRentImagesPath[])?.map(
        (item) => item.filename
      );
      const data = await processUploadImage({ images, rentId });
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
      const rentId = new mongoose.Types.ObjectId(id);
      const { images, imageUrl } = req.body;
      await processUnlinkImage({
        rentId,
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
      const data = await processHostListedRentProperties({ host });
      res.status(200).json({
        status: "success",
        message: "Listed Properties For Rent Retrieve successful",
        data,
      });
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },
  handleChangeStatus: async (
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
      const { status } = req.body;
      const payload: IRent = {
        status,
      };
      const data = await processChangeStatus({ rentId, payload });
      res.status(200).json({
        status: "success",
        message: `Listed item status Changed to ${status}`,
        data,
      });
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },
  handleGetApprovedRentListedItems: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { page } = req.query;
      const queryPage: number = Number(page);
      if (!page) {
        const { data, total } = await processGetApprovedRentListedItems({
          page: 1,
        });
        const totalPages = Math.ceil(total / documentPerPage);
        res.status(200).json({
          status: "success",
          message: `Retrieve All Approved Rent Listed Items`,
          totalPages,
          totalItems: total,
          currentPage: `http://localhost:5000/api/v1/rent`,
          previousPage: null,
          nextPage:
            queryPage < totalPages
              ? `http://localhost:5000/api/v1/rent?page=${queryPage + 1}`
              : null,
          data,
        });
      } else {
        const { data, total } = await processGetApprovedRentListedItems({
          page: queryPage,
        });
        const totalPages = Math.ceil(total / documentPerPage);
        res.status(200).json({
          status: "success",
          message: `Retrieve All Approved Rent Listed Items`,
          totalPages,
          totalItems: total,
          currentPage: `http://localhost:5000/api/v1/rent?page=${queryPage}`,
          previousPage:
            queryPage !== 1
              ? `http://localhost:5000/api/v1/rent?page=${queryPage - 1}`
              : null,
          nextPage:
            queryPage < totalPages
              ? `http://localhost:5000/api/v1/rent?page=${queryPage + 1}`
              : null,
          data,
        });
      }
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },
  handleDeleteListedRentItem: async (
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
      processDeleteListedRentItem({ rentId });
      res.status(200).json({
        status: "success",
        message: `Item delete successful`,
      });
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },
};

export default RentControllers;
