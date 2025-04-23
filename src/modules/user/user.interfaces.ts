import { Document, Types } from "mongoose";
import {
  AccountStatus,
  UserRole,
} from "../../interfaces/jwtPayload.interfaces";
import { DocumentType } from "./user.enums";

export interface IUser extends Document {
  avatar: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
  password: string;
  profile: Types.ObjectId;
  accountStatus: AccountStatus;
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
  id: Types.ObjectId;
  accesstoken: string;
}

export interface IProcessResendEmailPayload {
  name: string;
  email: string;
}

export interface IIdentityDocument {
  documentType?: DocumentType;
  frontSide?: string;
  backSide?: string;
  user?: Types.ObjectId;
}
