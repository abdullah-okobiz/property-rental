import { Request, Response, NextFunction } from "express";
import logger from "../../configs/logger.configs";
import FlatBookingService from './flatbooking.service';

const FlatBookingController = {
    handleCreateFlatBooking: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.authenticateTokenDecoded;
            const bookingData = { ...req.body, user: userId };
            const booking = await FlatBookingService.createBooking(bookingData);
            res.status(201).json({
                status: "success",
                message: "Booking submitted successfully",
                data: booking,
            });
        } catch (error) {
            const err = error as Error;
            logger.error(err.message);
            next(err);
        }
    },

    handleGetAllFlatBookings: async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const bookings = await FlatBookingService.getAllBookings();
            res.status(200).json({
                status: "success",
                message: "All bookings retrieved successfully",
                data: bookings,
            });
        } catch (error) {
            const err = error as Error;
            logger.error(err.message);
            next(err);
        }
    },
};

export default FlatBookingController;
