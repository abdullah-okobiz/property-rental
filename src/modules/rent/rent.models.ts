import { HydratedDocument, model, Model, Schema, Types } from "mongoose";
import IRent, { IFloorPlan, RentListingStatus } from "./rent.interfaces";
import SlugUtils from "../../utils/slug.utils";

const { generateSlug } = SlugUtils;

const FloorPlanSchema = new Schema<IFloorPlan>(
  {
    bedroomCount: { type: Number, default: 0 },
    bathCount: { type: Number, default: 0 },
    bedCount: { type: Number, default: 0 },
    guestCount: { type: Number, default: 0 },
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
  floorPlan: {
    type: FloorPlanSchema,
    default: {
      bedRoomCount: 0,
      bathCount: 0,
      bedCount: 0,
      guestCount: 0,
    },
  },
  cancellationPolicy: { type: [String], default: null },
  host: { type: Types.ObjectId, ref: "User", require: true },
  houseRules: { type: [String], default: null },
  listingFor: [
    {
      type: Types.ObjectId,
      ref: "Feature",
      default: null,
    },
  ],
  location: { type: String, default: null },
  price: { type: Number, default: null },
  status: {
    type: String,
    enum: RentListingStatus,
    default: RentListingStatus.IN_PROGRESS,
  },
  slug: { type: String, unique: true, index: true },
});

RentSchema.pre("save", async function (next) {
  const rent = this as HydratedDocument<IRent>;
  if ((rent.isModified("title") || rent.isNew) && rent.title) {
    try {
      rent.slug = generateSlug(rent?.title as string);
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  }
  next();
});

RentSchema.index(
  { category: 1 },
  { unique: true, partialFilterExpression: { category: { $type: "objectId" } } }
);
const Rent: Model<IRent> = model<IRent>("Rent", RentSchema);

export default Rent;
