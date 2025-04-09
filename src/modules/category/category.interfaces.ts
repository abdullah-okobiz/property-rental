import { Document, Types } from "mongoose";

interface ICategory extends Document {
  categoryName: string;
  feature: Types.ObjectId;
}

export interface ICategoryPayload {
  categoryName?: string;
  feature?: Types.ObjectId;
  categoryId?: Types.ObjectId;
}

export default ICategory;
