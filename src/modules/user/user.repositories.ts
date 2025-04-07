import mongoose from "mongoose";
import Profile from "../profile/profile.models";
import { ISignupPayload, IUser } from "./user.interfaces";
import User from "./user.model";

const UserRepositories = {
  createUser: async (signupPayload: ISignupPayload): Promise<IUser> => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const user = new User(signupPayload);
      const savedUser = await user.save({ session });
      const profile = new Profile({ user: user.id });
      await profile.save({ session });
      await session.commitTransaction();
      session.endSession();
      return savedUser;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In User Creation Operation");
      }
    }
  },
  findUserByEmailOrPhone: async (payload: string): Promise<IUser | null> => {
    try {
      const isEmail = payload.includes("@");
      const query = isEmail ? { email: payload } : { phone: payload };
      const foundedUser = await User.findOne(query);
      if (!foundedUser) return null;
      return foundedUser;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In User Find Operation");
      }
    }
  },
  verifyUser: async (email: string) => {
    try {
      const verifiedUserData = await User.findOneAndUpdate(
        { email },
        { isVerified: true }
      );
      return verifiedUserData;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In User Find Operation");
      }
    }
  },
  deleteUser: async (payload: mongoose.Schema.Types.ObjectId) => {
    try {
      const verifiedUserData = await User.findByIdAndDelete(payload);
      return verifiedUserData;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In User Delete Operation");
      }
    }
  },
};

export default UserRepositories;
