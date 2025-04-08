import mongoose, { ObjectId } from "mongoose";
import Profile from "../profile/profile.models";
import { ISignupPayload, IUser } from "./user.interfaces";
import User from "./user.model";

const UserRepositories = {
  createUser: async (signupPayload: ISignupPayload): Promise<IUser> => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const user = new User(signupPayload);

      const profile = new Profile({ user: user.id });
      user.profile = profile._id as ObjectId;
      const savedUser = await user.save({ session });
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
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const verifiedUserData = await User.findByIdAndDelete(payload);
      await Profile.findOneAndDelete({ user: payload });
      session.endSession();
      return verifiedUserData;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In User Delete Operation");
      }
    }
  },
};

export default UserRepositories;
