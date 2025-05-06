import { model, Model, Schema, Types } from "mongoose";
import ILand, { ListingPublishStatus } from "./land.interfaces";

const LandSchema = new Schema<ILand>(
  {
    title: { type: String, default: null },
    description: { type: String, default: null },
    location: { type: String, default: null },
    images: { type: [String], default: null },
    video: { type: String, default: null },
    price: { type: Number, default: null },
    coverImage: { type: String, default: null },
    category: { type: Types.ObjectId, ref: "Category", default: null },
    listingFor: [{ type: Types.ObjectId, ref: "Feature" }],
    landSize: { type: Number, default: null },
    host: { type: Types.ObjectId, ref: "User", required: true },
    publishStatus: {
      type: String,
      enum: ListingPublishStatus,
      default: ListingPublishStatus.IN_PROGRESS,
    },
    isSold: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Land: Model<ILand> = model<ILand>("Land", LandSchema);

export default Land;
