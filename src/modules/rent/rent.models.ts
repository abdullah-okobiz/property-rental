import { model, Model, Schema, Types } from "mongoose";
import IRent, { IFloorPlan, RentListingStatus } from "./rent.interfaces";

const FloorPlanSchema = new Schema<IFloorPlan>(
  {
    bedRoomCount: { type: Number },
    bathCount: { type: Number },
    bedCount: { type: Number },
    guestCount: { type: Number },
  },
  { _id: false }
);

const RentSchema = new Schema<IRent>({
  title: { type: String, default: null },
  description: { type: String, default: null },
  coverImage: { type: String, default: null },
  images: { type: [String], default: null },
  category: {
    type: Types.ObjectId,
    ref: "Category",
    default: null,
  },
  amenities: [{ type: Types.ObjectId, ref: "Amenities" }],
  allowableThings: { type: [String], default: null },
  floorPlan: { type: FloorPlanSchema, default: null },
  cancellationPolicy: { type: [String], default: null },
  host: { type: Types.ObjectId, ref: "User", require: true },
  houseRules: { type: [String], default: null },
  listingFor: [
    { type: Types.ObjectId, ref: "Feature", unique: true, default: null },
  ],
  location: { type: String, default: null },
  price: { type: Number, default: null },
  status: {
    type: String,
    enum: RentListingStatus,
    default: RentListingStatus.IN_PROGRESS,
  },
});
RentSchema.index(
  { category: 1 },
  { unique: true, partialFilterExpression: { category: { $type: "objectId" } } }
);
const Rent: Model<IRent> = model<IRent>("Rent", RentSchema);

export default Rent;
