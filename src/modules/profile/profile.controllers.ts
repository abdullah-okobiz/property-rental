import { NextFunction, Request, Response } from "express";
import logger from "../../configs/logger.configs";
import ProfileServices from "./profile.services";
import { TokenPayload } from "../../interfaces/jwtPayload.interfaces";

const {
  processCreateWorksAt,
  processRetrieveWorksAt,
  processCreateLocation,
  processRetrieveLocation,
  processCreateLanguage,
  processRetrieveLanguage,
} = ProfileServices;
const ProfileControllers = {
  handleCreateWorksAt: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { worksAt } = req.body;
      const { userId } = req.authenticateTokenDecoded as TokenPayload;
      const data = await processCreateWorksAt({ id: userId, worksAt });
      res
        .status(201)
        .json({ status: "success", message: "Works at added", data });
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },
  handleGetWorksAt: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.authenticateTokenDecoded as TokenPayload;
      const data = await processRetrieveWorksAt(userId);
      res
        .status(200)
        .json({ status: "success", message: "Works at retrieved", data });
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },
  handleCreateLocation: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { location } = req.body;
      const { userId } = req.authenticateTokenDecoded as TokenPayload;
      const data = await processCreateLocation({ id: userId, location });
      res
        .status(201)
        .json({ status: "success", message: "location added", data });
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },
  handleGetLocation: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.authenticateTokenDecoded as TokenPayload;
      const data = await processRetrieveLocation(userId);
      res
        .status(200)
        .json({ status: "success", message: "location retrieved", data });
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },
  handleUpdateLanguage: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { languages } = req.body;
      console.log(languages);
      const { userId } = req.authenticateTokenDecoded as TokenPayload;
      const data = await processCreateLanguage({ id: userId, languages });
      res
        .status(200)
        .json({ status: "success", message: "languages updated", data });
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },
  handleGetLanguage: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.authenticateTokenDecoded as TokenPayload;
      const data = await processRetrieveLanguage(userId);
      res
        .status(200)
        .json({ status: "success", message: "languages retrieved", data });
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },
};

export default ProfileControllers;
