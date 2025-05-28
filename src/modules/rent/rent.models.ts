import { HydratedDocument, model, Model, Schema, Types } from 'mongoose';
import IRent, { IFloorPlan, RentListingStatus } from './rent.interfaces';
import SlugUtils from '../../utils/slug.utils';

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

// const RentSchema = new Schema<IRent>({
//   title: { type: String, default: null },
//   description: { type: String, default: null },
//   coverImage: { type: String, default: null },
//   images: { type: [String], default: null },
//   category: {
//     type: Types.ObjectId,
//     ref: 'Category',
//     default: null,
//   },
//   amenities: [{ type: Types.ObjectId, ref: 'Amenities' }],
//   allowableThings: { type: [String], default: null },
//   floorPlan: {
//     type: FloorPlanSchema,
//     default: {
//       bedRoomCount: 0,
//       bathCount: 0,
//       bedCount: 0,
//       guestCount: 0,
//     },
//   },
//   cancellationPolicy: { type: [String], default: null },
//   host: { type: Types.ObjectId, ref: 'User', require: true },
//   houseRules: { type: [String], default: null },
//   listingFor: [
//     {
//       type: Types.ObjectId,
//       ref: 'Feature',
//       default: null,
//     },
//   ],
//   location: { type: String, default: null },
//   price: { type: Number, default: null },
//   status: {
//     type: String,
//     enum: RentListingStatus,
//     default: RentListingStatus.IN_PROGRESS,
//   },
//   slug: {
//     type: String,
//     index: {
//       unique: true,
//       partialFilterExpression: { slug: { $type: 'string' } },
//     },
//   },
//   latitude: { type: Number, default: null },
//   longitude: { type: Number, default: null },
// });

const RentSchema = new Schema<IRent>({
  title: { type: String, default: null },
  description: { type: String, default: null },
  coverImage: { type: String, default: null },
  images: { type: [String], default: null },
  category: {
    type: Types.ObjectId,
    ref: 'Category',
    default: null,
  },
  amenities: [{ type: Types.ObjectId, ref: 'Amenities' }],
  allowableThings: { type: [String], default: null },
  floorPlan: {
    type: FloorPlanSchema,
    default: {
      bedroomCount: 0,
      bathCount: 0,
      bedCount: 0,
      guestCount: 0,
    },
  },
  cancellationPolicy: { type: [String], default: null },
  houseRules: { type: [String], default: null },
  host: { type: Types.ObjectId, ref: 'User', require: true },
  listingFor: [
    {
      type: Types.ObjectId,
      ref: 'Feature',
      default: null,
    },
  ],
  location: { type: String, default: null },

  checkinDate: { type: Date, default: null },
  checkoutDate: { type: Date, default: null },
  adultCount: { type: Number, default: 0 },
  childrenCount: { type: Number, default: 0 },

  price: { type: Number, default: null },
  status: {
    type: String,
    enum: RentListingStatus,
    default: RentListingStatus.IN_PROGRESS,
  },
  slug: {
    type: String,
    index: {
      unique: true,
      partialFilterExpression: { slug: { $type: 'string' } },
    },
  },
  latitude: { type: Number, default: null },
  longitude: { type: Number, default: null },
});

RentSchema.pre('save', async function (next) {
  const rent = this as HydratedDocument<IRent>;

  if (rent.isModified('title') || rent.isNew) {
    try {
      const baseSlug = rent.title?.trim() || `listing-${Date.now()}`;
      rent.slug = generateSlug(baseSlug);
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
  { unique: true, partialFilterExpression: { category: { $type: 'objectId' } } }
);
const Rent: Model<IRent> = model<IRent>('Rent', RentSchema);

export default Rent;
