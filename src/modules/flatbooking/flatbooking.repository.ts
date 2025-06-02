
import { IFlatBooking } from "./flatbooking.interfaces";
import FlatBooking from './flatbooking.models';

const FlatBookingRepository = {
    createBooking: async (data: IFlatBooking) => {
        try {
            const booking = new FlatBooking(data);
            await booking.save();
            return booking;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error("Unknown error occurred while creating flat booking.");
            }
        }
    },

    getAllBookings: async () => {
        try {
            const bookings = await FlatBooking.find()
                .populate("flat")
                .populate({
                    path: 'user',
                    select: '-password'
                })
            return bookings;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error("Unknown error occurred while fetching flat bookings.");
            }
        }
    },
};

export default FlatBookingRepository;
