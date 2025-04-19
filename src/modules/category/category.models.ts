import { Model, model, Schema } from "mongoose";
import ICategory from "./category.interfaces";

const CategorySchema = new Schema<ICategory>(
  {
    categoryName: { type: String, default: null },
    feature: [{ type: Schema.Types.ObjectId, ref: "Feature", required: true }],
  },
  { timestamps: true }
);

const Category: Model<ICategory> = model<ICategory>("Category", CategorySchema);

export default Category;
