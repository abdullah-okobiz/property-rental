import { Types } from "mongoose";

export enum RentListingStatus {
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
  status?: RentListingStatus;
  host?: Types.ObjectId;
}
export interface ICreateRentPayload {
  images?: string[];
  payload?:IRent
}
export interface IRentPayload {
  payload?: IRent;
  rentId?: Types.ObjectId;
  listingStatus?: RentListingStatus;
  host?: Types.ObjectId;
  images?: string[];
  singleImage?: string;
  coverImageIndex?: number;
  page?: number;
}
export interface IRentImagesPath {
  filename: string;
}

export interface IGetAllRentRequestedQuery {
  publishStatus?: string;
  page?: number;
  sort?: 1 | -1;
}

export interface IGetAllRentQuery {
  publishStatus?: string;
}

export interface IGetAllRentPayload {
  query: IGetAllRentQuery;
  page?: number;
  sort?: 1 | -1;
}

export default IRent;
