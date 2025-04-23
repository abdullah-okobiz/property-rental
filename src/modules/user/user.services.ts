import redisClient from "../../configs/redis.configs";
import { TokenPayload } from "../../interfaces/jwtPayload.interfaces";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/jwt.utils";
import sendVerificationEmail from "../../utils/sendVerificationEmail.utils";
import {
  ISignupPayload,
  IUser,
  ITokenProcessReturn,
  IProcessDeleteUserPayload,
  IProcessResendEmailPayload,
} from "./user.interfaces";
import UserRepositories from "./user.repositories";
import otpGenerator from "otp-generator";

const { createUser, verifyUser, deleteUser } = UserRepositories;
const UserServices = {
  processSignup: async (payload: ISignupPayload) => {
    try {
      const createdUser = await createUser(payload);
      const otp = otpGenerator.generate(5, {
        digits: true,
        lowerCaseAlphabets: false,
        specialChars: false,
        upperCaseAlphabets: false,
      });
      await redisClient.set(
        `user:profile:${createdUser._id}`,
        JSON.stringify(createdUser),
        "EX",
        86400
      );
      await redisClient.set(`user:otp:${createdUser.email}`, otp, "EX", 2 * 60);
      await sendVerificationEmail({
        email: createdUser.email,
        expirationTime: 2,
        name: createdUser.name,
        otp,
      });
      return createdUser;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In Signup Service");
      }
    }
  },
  processVerify: async (email: string): Promise<ITokenProcessReturn | null> => {
    const data = await verifyUser(email);
    try {
      if (data) {
        const { email, isVerified, role, id, name, accountStatus } = data;
        const accessToken = generateAccessToken({
          email,
          isVerified,
          role,
          userId: id,
          name,
          accountStatus,
        }) as string;
        const refreshToken = generateRefreshToken({
          email,
          isVerified,
          role,
          userId: id,
          name,
          accountStatus,
        }) as string;

        return { accessToken, refreshToken } as ITokenProcessReturn;
      }
      return null;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In verify user service");
      }
    }
  },
  processLogin: (payload: IUser): ITokenProcessReturn => {
    const { email, isVerified, role, id, name, accountStatus } = payload;
    const accessToken = generateAccessToken({
      email,
      isVerified,
      role,
      userId: id,
      name,
      accountStatus,
    }) as string;
    const refreshToken = generateRefreshToken({
      email,
      isVerified,
      role,
      userId: id,
      name,
      accountStatus,
    }) as string;

    return { accessToken, refreshToken } as ITokenProcessReturn;
  },
  processTokens: (payload: TokenPayload): ITokenProcessReturn => {
    const { email, isVerified, role, userId, name, accountStatus } = payload;

    const accessToken = generateAccessToken({
      email,
      isVerified,
      role,
      userId,
      name,
      accountStatus,
    }) as string;

    const refreshToken = generateRefreshToken({
      email,
      isVerified,
      role,
      userId,
      name,
      accountStatus,
    }) as string;

    return { accessToken, refreshToken } as ITokenProcessReturn;
  },
  processLogout: async (payload: string) => {
    try {
      await redisClient.set(`blacklist:${payload}`, payload);
    } catch (error) {
      throw error;
    }
  },
  processDeleteUser: async ({ accesstoken, id }: IProcessDeleteUserPayload) => {
    try {
      const data = await deleteUser(id);
      if (!data) return false;
      await redisClient.set(`blacklist:${accesstoken}`, accesstoken);
      return true;
    } catch (error) {
      throw error;
    }
  },
  processResend: async ({ email, name }: IProcessResendEmailPayload) => {
    try {
      const otp = otpGenerator.generate(5, {
        digits: true,
        lowerCaseAlphabets: false,
        specialChars: false,
        upperCaseAlphabets: false,
      });
      await redisClient.set(`user:otp:${email}`, otp, "EX", 2 * 60);
      await sendVerificationEmail({
        email: email,
        expirationTime: 2,
        name: name,
        otp,
      });
    } catch (error) {
      throw error;
    }
  },
};

export default UserServices;
