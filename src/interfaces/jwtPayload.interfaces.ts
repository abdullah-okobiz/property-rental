import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

export enum UserRole {
  Host = "host",
  Guest = "guest",
  Admin = "admin",
}
export interface TokenPayload extends JwtPayload {
  userId: Types.ObjectId;
  email: string;
  name: string;
  role: UserRole;
  isVerified: boolean;
}
