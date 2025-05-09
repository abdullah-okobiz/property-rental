import { NextFunction, Request, Response } from "express";
import logger from "../../configs/logger.configs";
import mongoose from "mongoose";
import { documentPerPage } from "../../const";
import FlatServices from "./flat.services";
import IFlat, {
  IFlatImagesPath,
  IGetAllFlatRequestedQuery,
} from "./flat.interfaces";

const {
  processInitializeFlatListing,
  processUpdateFlatListing,
  processUploadImage,
  processUnlinkImage,
  processHostListedFlatProperties,
  processGetAllListedFlat,
  processDeleteListedFlatItem,
  processCreateFlat,
  processChangeStatus,
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
  handleCreateFlat: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.authenticateTokenDecoded;
      const payload = req.body as IFlat;
      payload.host = userId;
      const images = (req?.files as IFlatImagesPath[])?.map(
        (item) => item.filename
      );
      const data = await processCreateFlat({ images, payload });
      res.status(200).json({
        status: "success",
        message: "New Flat Created",
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
  handleGetAllHostListedPropertiesForFlat: async (
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
  handleGetAllFlat: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { publishStatus, page, sort, search, isSold } =
        req.query as IGetAllFlatRequestedQuery;
      const { data, total } = await processGetAllListedFlat({
        publishStatus,
        page,
        sort,
        isSold,
        search,
      });
      const totalPages = Math.ceil(total / documentPerPage);
      const totalContacts = total;
      const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}${
        req.path
      }`;

      const buildQuery = (pageNumber: number) => {
        const query = new URLSearchParams();
        if (isSold !== undefined) query.set("isSold", String(isSold));
        if (search) query.set("search", search);
        if (publishStatus) query.set("publishStatus", publishStatus);
        if (sort) query.set("sort", String(sort));
        if (pageNumber !== 1) query.set("page", String(pageNumber));

        const queryString = query.toString();
        return queryString ? `${baseUrl}?${queryString}` : baseUrl;
      };
      const currentPage = Number(page) || 1;
      const currentPageUrl = buildQuery(currentPage);
      const nextPageUrl =
        currentPage < totalPages ? buildQuery(currentPage + 1) : null;
      const previousPageUrl =
        currentPage > 1 ? buildQuery(currentPage - 1) : null;
      res.status(200).json({
        status: "success",
        message: `All Listed Flat Item Retrieve successful`,
        totalContacts,
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
        res.status(400).json({ status: "error", message: "Invalid Land ID" });
        return;
      }
      const flatId = new mongoose.Types.ObjectId(id);
      const { status, isSold } = req.body;
      const reqBody: IFlat = {};
      if (status) reqBody.publishStatus = status;
      if (isSold) reqBody.isSold = isSold;
      const data = await processChangeStatus({ flatId, reqBody });
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
  handleDeleteListedFlatItem: async (
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
      await processDeleteListedFlatItem({ flatId });
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

export default FlatControllers;
