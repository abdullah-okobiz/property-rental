import { model, Model, Schema, Types } from "mongoose";
import IFlat, { IFlatFloorPlan, ListingPublishStatus } from "./flat.interfaces";

const FloorPlanSchema = new Schema<IFlatFloorPlan>(
  {
    unitCount: { type: Number, default: 0 },
    drawing: { type: Boolean, default: false },
    dinning: { type: Boolean, default: false },
    balconyCount: { type: Number, default: 0 },
    bedroomCount: { type: Number, default: 0 },
    bathroomCount: { type: Number, default: 0 },
  },
  { _id: false }
);

const FlatSchema = new Schema<IFlat>(
  {
    title: { type: String, default: null },
    description: { type: String, default: null },
    location: { type: String, default: null },
    images: { type: [String], default: null },
    video: { type: String, default: null },
    price: { type: Number, default: null },
    coverImage: { type: String, default: null },
    category: { type: Types.ObjectId, ref: "Category", default: null },
    listingFor: [{ type: Types.ObjectId, ref: "Feature", default: null }],
    buildingYear: { type: String, default: null },
    floorPlan: {
      type: FloorPlanSchema,
      default: {
        unitCount: 0,
        drawing: false,
        dinning: false,
        balconyCount: 0,
        bedroomCount: 0,
        bathroomCount: 0,
      },
    },
    amenities: { type: [String], default: null },
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

const Flat: Model<IFlat> = model<IFlat>("Flat", FlatSchema);

export default Flat;
