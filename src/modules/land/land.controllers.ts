import { NextFunction, Request, Response } from "express";
import logger from "../../configs/logger.configs";
import mongoose from "mongoose";
import { documentPerPage } from "../../const";
import LandServices from "./land.services";
import ILand, {
  IGetAllLandRequestedQuery,
  ILandImagesPath,
} from "./land.interfaces";

const {
  processChangeStatus,
  processDeleteListedLandItem,
  processGetAllListedLand,
  processHostListedLandProperties,
  processInitializeLandListing,
  processUnlinkImage,
  processUpdateLandListing,
  processUploadImage,
} = LandServices;

const LandControllers = {
  handleInitializeLandListing: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.authenticateTokenDecoded;
      const data = await processInitializeLandListing({ userId });
      res.status(201).json({
        status: "success",
        message: "new land listing initialized",
        data,
      });
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },
  handleUpdateLandListingField: async (
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
      const landId = new mongoose.Types.ObjectId(id);
      const data = await processUpdateLandListing({ landId, reqBody });
      res.status(200).json({
        status: "success",
        message: "new land listing initialized",
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
      const landId = new mongoose.Types.ObjectId(id);
      const images = (req?.files as ILandImagesPath[])?.map(
        (item) => item.filename
      );
      const data = await processUploadImage({ landId, images });
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
      const landId = new mongoose.Types.ObjectId(id);
      const { images, imageUrl } = req.body;
      await processUnlinkImage({
        landId,
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
  handleGetAllHostListedLand: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.authenticateTokenDecoded;
      const host = userId;
      const data = await processHostListedLandProperties({ userId: host });
      res.status(200).json({
        status: "success",
        message: "Listed Properties For Land Retrieve successful",
        data,
      });
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },
  handleGetAllLand: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { publishStatus, page, sort } =
        req.query as IGetAllLandRequestedQuery;
      const { data, total } = await processGetAllListedLand({
        publishStatus,
        page,
        sort,
      });
      const totalPages = Math.ceil(total / documentPerPage);
      const totalUsers = total;
      const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}${
        req.path
      }`;
      const buildQuery = (pageNumber: number) => {
        const query = new URLSearchParams();
        if (publishStatus) query.set("publishStatus", publishStatus);
        if (sort) query.set("sort", String(sort));
        query.set("page", String(pageNumber));
        return `${baseUrl}?${query.toString()}`;
      };
      const currentPage = Number(page) || 1;
      const currentPageUrl = buildQuery(currentPage);
      const nextPageUrl =
        currentPage < totalPages ? buildQuery(currentPage + 1) : null;
      const previousPageUrl =
        currentPage > 1 ? buildQuery(currentPage - 1) : null;
      res.status(200).json({
        status: "success",
        message: `All ${publishStatus} request found successful`,
        totalUsers,
        totalPages,
        currentPageUrl,
        nextPageUrl,
        previousPageUrl,
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
      const landId = new mongoose.Types.ObjectId(id);
      const { status } = req.body;
      const reqBody: ILand = {};
      reqBody.publishStatus = status;
      const data = await processChangeStatus({ landId, reqBody });
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
  handleDeleteListedLandItem: async (
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
      const landId = new mongoose.Types.ObjectId(id);
      await processDeleteListedLandItem({ landId });
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

export default LandControllers;
