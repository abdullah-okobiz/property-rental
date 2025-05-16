import { HydratedDocument, model, Model, Schema, Types } from 'mongoose';
import ILand, { ListingPublishStatus } from './land.interfaces';
import SlugUtils from '../../utils/slug.utils';

const { generateSlug } = SlugUtils;

const LandSchema = new Schema<ILand>(
  {
    title: { type: String, default: null },
    description: { type: String, default: null },
    location: { type: String, default: null },
    images: { type: [String], default: null },
    video: { type: String, default: null },
    price: { type: Number, default: null },
    coverImage: { type: String, default: null },
    category: { type: Types.ObjectId, ref: 'Category', default: null },
    listingFor: [{ type: Types.ObjectId, ref: 'Feature' }],
    landSize: { type: Number, default: null },
    host: { type: Types.ObjectId, ref: 'User', required: true },
    publishStatus: {
      type: String,
      enum: ListingPublishStatus,
      default: ListingPublishStatus.IN_PROGRESS,
    },
    slug: { type: String, unique: true, index: true },
    isSold: { type: Boolean, default: false },
  },
  { timestamps: true }
);

LandSchema.pre('save', async function (next) {
  const land = this as HydratedDocument<ILand>;
  if ((land.isModified('title') || land.isNew) && land.title) {
    try {
      land.slug = generateSlug(land?.title as string);
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  }
  next();
});

const Land: Model<ILand> = model<ILand>('Land', LandSchema);

export default Land;
