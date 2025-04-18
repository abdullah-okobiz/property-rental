import { Document, Types } from "mongoose";

interface ICategory extends Document {
  categoryName: string;
}

export interface ICategoryPayload {
  categoryName?: string;
  categoryId?: Types.ObjectId;
}

export default ICategory;
