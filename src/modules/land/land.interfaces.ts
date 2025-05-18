import { Types } from "mongoose";

export enum ListingPublishStatus {
  IN_PROGRESS = "in_progress",
  PENDING = "pending",
  PUBLISHED = "published",
  UNPUBLISHED = "unpublished",
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
  slug?: string;
  latitude?:number;
  longitude?:number;
}

export interface ICreateLandPayload {
  images?: string[];
  payload?: ILand;
}

export interface ILandPayload {
  userId?: Types.ObjectId;
  reqBody?: ILand;
  landId?: Types.ObjectId;
  images?: string[];
  singleImage?: string;
  isSold?: boolean;
  publishStatus?: string;
  slug?:string;
}

export interface ILandImagesPath {
  filename: string;
}

export interface IGetAllLandRequestedQuery {
  category?: string;
  isSold?: boolean;
  search?: string;
  publishStatus?: string;
  page?: number;
  sort?: 1 | -1;
}

export interface IGetAllLandQuery {
  category?: string;
  isSold?: boolean;
  host?: Types.ObjectId;
  publishStatus?: string;
  email?: string;
}

export interface IGetAllLandPayload {
  query: IGetAllLandQuery;
  page?: number;
  sort?: 1 | -1;
}

export default ILand;
