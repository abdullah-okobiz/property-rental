import { Schema, model, Model } from 'mongoose';
import { IFlatBooking } from './flatbooking.interfaces';

const FlatBookingSchema = new Schema<IFlatBooking>(
    {
        flat: { type: Schema.Types.ObjectId, ref: 'Flat', required: true },
        name: { type: String, },
        email: { type: String,  },
        phone: { type: String, required: true },
        message: { type: String, default: null },
        user: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    },
    { timestamps: true }
);

FlatBookingSchema.index({ flat: 1, email: 1 }, { unique: false });

const FlatBooking: Model<IFlatBooking> = model<IFlatBooking>('FlatBooking', FlatBookingSchema);

export default FlatBooking;
