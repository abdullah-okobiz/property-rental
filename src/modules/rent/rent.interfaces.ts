import { Types } from "mongoose";

export enum Status {
  IN_PROGRESS = "in_progress",
  PENDING = "pending",
  APPROVED = "approved",
}

export interface IFloorPlan {
  guestCount: number;
  bathCount: number;
  bedCount: number;
  bedRoomCount: number;
}

interface IRent {
  title?: string;
  images?: string[];
  coverImage?: string;
  description?: string;
  floorPlan?: IFloorPlan;
  location?: string;
  price?: number;
  category?: Types.ObjectId;
  listingFor?: Types.ObjectId;
  cancellationPolicy?: string[];
  houseRules?: string[];
  allowableThings?: string[];
  amenities?: Types.ObjectId[];
  status?: Status;
  host?: Types.ObjectId;
}

export interface IRentPayload {
  payload?: IRent;
  rentId?: Types.ObjectId;
}

export default IRent;
