import { IRentPayload } from "./rent.interfaces";
import Rent from "./rent.models";
const RentRepositories = {
  initializedRentListing: async (payload: Partial<IRentPayload>) => {
    try {
      const data = new Rent(payload);
      await data.save();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In Rent Initialized Operation");
      }
    }
  },
  updateRentById: async ({ payload, rentId }: IRentPayload) => {
    try {
      const data = await Rent.findByIdAndUpdate(rentId, payload, {
        new: true,
        runValidators: true,
      });
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In Rent Update Operation");
      }
    }
  },
};

export default RentRepositories;
