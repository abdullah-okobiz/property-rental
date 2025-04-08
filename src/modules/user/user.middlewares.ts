import { NextFunction, Request, Response } from "express";
import { signupInputValidationSchema } from "./user.validations";
import UserRepositories from "./user.repositories";
import redisClient from "../../configs/redis.configs";
import { verifyAccessToken, verifyRefreshToken } from "../../utils/jwt.utils";
import { TokenPayload, UserRole } from "../../interfaces/jwtPayload.interfaces";

const { findUserByEmailOrPhone } = UserRepositories;

const UserMiddlewares = {
  signupInputValidation: (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const validationResult = signupInputValidationSchema.safeParse(payload);
    if (!validationResult?.success) {
      const formatErrors = validationResult?.error?.format();
      const errors = Object.entries(formatErrors)
        .filter(([key]) => key !== "_errors")
        .map(([field, value]) => {
          let message = "";
          if (Array.isArray(value)) {
            message = value[0];
          } else if (value?._errors) {
            message = value._errors[0];
          }

          return { field, message };
        });
      res
        .status(400)
        .json({ status: false, message: "Validation Error", error: errors });
      return;
    }
    next();
  },
  isSignupUserExist: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { email } = req.body;
    const isUserExist = await findUserByEmailOrPhone(email);
    if (isUserExist) {
      res.status(409).json({ status: "error", message: "User already exists" });
      return;
    }
    next();
  },
  isUserExist: async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const isUserExist = await findUserByEmailOrPhone(email);
    if (!isUserExist) {
      res.status(404).json({ status: "error", message: "User Not Found" });
      return;
    }
    if (!isUserExist.isVerified) {
      res.status(400).json({ status: "error", message: "User Not Verified" });
      return;
    }
    req.user = isUserExist;
    next();
  },
  isAdmin: async (req: Request, res: Response, next: NextFunction) => {
    const role = req?.authenticateTokenDecoded?.role;
    console.log(role);
    if (role !== UserRole.Admin) {
      res.status(403).json({
        status: "error",
        message: "You do not have permission to access this resource",
      });
      return;
    }
    next();
  },
  checkVerificationOtp: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { otp, email } = req.body;
    const savedOtp = await redisClient.get(`user:otp:${email}`);
    if (!savedOtp) {
      res.status(400).json({ status: "error", message: "OTP has expired" });
      return;
    }
    if (savedOtp !== otp) {
      res
        .status(400)
        .json({ status: "error", message: "Provided OTP is incorrect" });
      return;
    }
    next();
  },
  checkAccessToken: async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    try {
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({
          status: "error",
          message: "Unauthorize Request",
          error: "Accesstoken is missing",
        });
        return;
      }
      const token = authHeader?.split(" ")[1];
      const isBlacklisted = await redisClient.get(`blacklist:${token}`);
      if (isBlacklisted) {
        res.status(403).json({
          status: "error",
          message: "Permission Denied",
          error: "Accesstoken has been revoked",
        });
        return;
      }
      const decoded = verifyAccessToken(token);
      if (!decoded) {
        res.status(403).json({
          status: "error",
          message: "Permission Denied",
          error: "Accesstoken expired or invalid",
        });
        return;
      }
      req.authenticateTokenDecoded = decoded as TokenPayload;
      next();
    } catch (error) {
      throw error;
    }
  },
  checkRefreshToken: (req: Request, res: Response, next: NextFunction) => {
    const { refreshtoken } = req.cookies;
    if (refreshtoken) {
      const decoded = verifyRefreshToken(refreshtoken);
      if (!decoded) {
        res.status(403).json({
          status: "error",
          message: "Permission Denied",
          error: "Refreshtoken expired or invalid",
        });
        return;
      } else {
        req.authenticateTokenDecoded = decoded as TokenPayload;
        next();
      }
    } else {
      res.status(401).json({
        status: "error",
        message: "Unauthorize Request",
        error: "Refreshtoken is missing",
      });
      return;
    }
  },
};

export default UserMiddlewares;
