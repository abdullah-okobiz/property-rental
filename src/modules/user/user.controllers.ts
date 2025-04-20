import { NextFunction, Request, Response } from "express";
import UserServices from "./user.services";
import logger from "../../configs/logger.configs";
import { IUser } from "./user.interfaces";
import cookieOption from "../../utils/cookie.utils";
import { Types } from "mongoose";

const {
  processSignup,
  processVerify,
  processLogin,
  processTokens,
  processLogout,
  processDeleteUser,
  processResend,
} = UserServices;

const UserControllers = {
  handleSignup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await processSignup(req.body);
      res
        .status(201)
        .json({ status: "success", message: "User created", data });
      return;
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },
  handleVerify: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const data = await processVerify(email);
      if (!data) {
        res.status(400).json({ status: "error", message: "Bad Request" });
        return;
      } else {
        const { accessToken, refreshToken } = data;
        res.clearCookie("refreshtoken");
        res.cookie("refreshtoken", refreshToken, cookieOption(null, 7));
        res.status(200).json({
          status: "success",
          message: "Account verification successful",
          accessToken,
        });
        return;
      }
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },
  handleLogin: (req: Request, res: Response, next: NextFunction) => {
    try {
      const { accessToken, refreshToken } = processLogin(req.user as IUser);
      res.cookie("refreshtoken", refreshToken, cookieOption(null, 7));
      res.status(200).json({
        status: "success",
        message: "Login successful",
        accessToken,
      });
      return;
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },
  handleCheck: (req: Request, res: Response, next: NextFunction) => {
    try {
      const decoded = req.authenticateTokenDecoded;
      res.status(204).send();
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },
  handleRefreshTokens: (req: Request, res: Response, next: NextFunction) => {
    try {
      const { accessToken, refreshToken } = processTokens(
        req.authenticateTokenDecoded
      );
      res.clearCookie("refreshtoken");
      res.cookie("refreshtoken", refreshToken, cookieOption(null, 7));
      res.status(200).json({
        status: "success",
        message: "Token refreshed",
        accessToken,
      });
      return;
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },
  handleLogout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      const accesstoken = authHeader?.split(" ")[1] as string;
      await processLogout(accesstoken);
      res.clearCookie("refreshtoken");
      res.status(204).send();
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },
  handleDeleteUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.authenticateTokenDecoded;
      const authHeader = req.headers.authorization;
      const accesstoken = authHeader?.split(" ")[1] as string;
      const isDeleted = await processDeleteUser({ id: userId as Types.ObjectId, accesstoken });
      if (!isDeleted)
        res.status(404).json({ status: "error", message: "user not found" });
      res.clearCookie("refreshtoken");
      res.status(200).json({ status: "success", message: "user deleted" });
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },
  handleResend: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name } = req.user as IUser;
      await processResend({ email, name });
      res
        .status(200)
        .json({ status: "success", message: "otp resend successful" });
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },
};

export default UserControllers;
