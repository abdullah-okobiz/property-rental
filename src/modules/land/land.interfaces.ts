import { Types } from "mongoose";

export enum ListingPublishStatus {
  IN_PROGRESS = "in_progress",
  PENDING = "pending",
  APPROVED = "approved",
}

interface ILand {
  title?: string;
  description?: string;
  location?: string;
  images?: string[];
  video?: string;
  price?: number;
  coverImage?: string;
  category?: Types.ObjectId;
  listingFor?: Types.ObjectId;
  landSize?: number;
  host?: Types.ObjectId;
  publishStatus?: ListingPublishStatus;
  isSold?: boolean;
}

export interface ILandPayload {
  userId?: Types.ObjectId;
  reqBody?: ILand;
  landId?: Types.ObjectId;
  images?: string[];
  singleImage?: string;
}

export interface ILandImagesPath {
  filename: string;
}

export interface IGetAllLandRequestedQuery {
  publishStatus?: string;
  page?: number;
  sort?: 1 | -1;
}

export interface IGetAllLandQuery {
  publishStatus?: string;
}

export interface IGetAllLandPayload {
  query: IGetAllLandQuery;
  page?: number;
  sort?: 1 | -1;
}

export default ILand;
