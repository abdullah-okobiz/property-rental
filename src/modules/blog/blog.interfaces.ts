import { Document, Types } from "mongoose";

export interface IBlogPayload {
  blogTitle?: string;
  blogImage?: string;
  blogDescription?: string;
  feature?: Types.ObjectId;
  tags?: string[];
  blogId?: Types.ObjectId;
  blogOldImage?: string;
}

export interface IBlogUpdateField {
  field: IBlogInterfces;
  blogId?: Types.ObjectId;
}

interface IBlogInterfces extends Document {
  blogTitle?: string;
  blogImage?: string;
  blogDescription?: string;
  feature?: Types.ObjectId;
  tags?: string[];
}

export default IBlogInterfces;
