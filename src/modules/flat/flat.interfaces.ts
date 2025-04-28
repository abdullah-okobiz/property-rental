import { Document, Types } from "mongoose";

export interface IFlatFloorPlan {
  unitCount?: number;
  drawing?: boolean;
  dinning?: boolean;
  balconyCount?: number;
  bedroomCount?: number;
  bathroomCount?: number;
}

export enum ListingPublishStatus {
  IN_PROGRESS = "in_progress",
  PENDING = "pending",
  APPROVED = "approved",
}

interface IFlat {
  title?: string;
  description?: string;
  location?: string;
  images?: string[];
  video?: string;
  price?: number;
  coverImage?: string;
  category?: Types.ObjectId;
  listingFor?: Types.ObjectId;
  buildingYear?: string;
  floorPlan?: IFlatFloorPlan;
  amenities?: string[];
  host?: Types.ObjectId;
  publishStatus?: ListingPublishStatus;
  isSold?: boolean;
}

export interface IFlatPayload {
  userId?: Types.ObjectId;
  reqBody?: IFlat;
  flatId?: Types.ObjectId;
  images?: string[];
  singleImage?: string;
}

export interface IFlatImagesPath {
  filename: string;
}

export interface IGetAllFlatRequestedQuery {
  publishStatus?: string;
  page?: number;
  sort?: 1 | -1;
}

export interface IGetAllFlatQuery {
  publishStatus?: string;
}

export interface IGetAllFlatPayload {
  query: IGetAllFlatQuery;
  page?: number;
  sort?: 1 | -1;
}

export default IFlat;
