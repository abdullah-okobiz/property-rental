import { IRentPayload } from "./rent.interfaces";
import RentRepositories from "./rent.repositories";

const { initializedRentListing, creatingRentListingById } = RentRepositories;
const RentServices = {
  processInitializeRentListing: async ({ host }: IRentPayload) => {
    try {
      const data = await initializedRentListing({ host });
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Unknown Error Occurred In initialize rent listing service"
        );
      }
    }
  },
};

export default RentServices;
