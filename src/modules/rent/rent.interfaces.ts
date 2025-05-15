import { Types } from "mongoose";

export enum RentListingStatus {
  IN_PROGRESS = "in_progress",
  PENDING = "pending",
  PUBLISHED = "published",
  UNPUBLISHED = "unpublished",
}

export interface IFloorPlan {
  guestCount: number;
  bathCount: number;
  bedCount: number;
  bedroomCount: number;
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
  slug?: string;
}
export interface ICreateRentPayload {
  images?: string[];
  payload?: IRent;
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
  category?: string;
  search?: string;
  status?: string;
  page?: number;
  sort?: 1 | -1;
}

export interface IGetAllRentQuery {
  category?: string;
  host?: Types.ObjectId;
  email?: string;
  status?: string;
}

export interface IGetAllRentPayload {
  query: IGetAllRentQuery;
  page?: number;
  sort?: 1 | -1;
}

export default IRent;
