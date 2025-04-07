import mongoose, { Document } from "mongoose";
import { UserRole } from "../../interfaces/jwtPayload.interfaces";

export interface IUser extends Document {
  avatar: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
  password: string;
  profile: mongoose.Schema.Types.ObjectId;
}

export interface ISignupPayload {
  role: UserRole;
  name: string;
  email: string;
  password: string;
}

export interface ITokenProcessReturn {
  accessToken: string;
  refreshToken: string;
}

export interface IProcessDeleteUserPayload {
  id: mongoose.Schema.Types.ObjectId;
  accesstoken: string;
}

export interface IProcessResendEmailPayload {
  name: string;
  email: string;
}
