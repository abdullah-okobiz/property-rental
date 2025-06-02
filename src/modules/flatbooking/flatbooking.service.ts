
import { IFlatBooking } from './flatbooking.interfaces';
import FlatBookingRepository from './flatbooking.repository';

const FlatBookingService = {
  createBooking: async (data: IFlatBooking) => {
    try {
      return await FlatBookingRepository.createBooking(data);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Unknown Error Occurred In Create Flat Booking Service');
      }
    }
  },

  getAllBookings: async () => {
    try {
      return await FlatBookingRepository.getAllBookings();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Unknown Error Occurred In Get All Flat Bookings Service');
      }
    }
  }
};

export default FlatBookingService;
