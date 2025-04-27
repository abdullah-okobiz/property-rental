import { IFlatPayload } from "./flat.interfaces";
import FlatRepositories from "./flat.repositories";

const { initializeFlatListing } = FlatRepositories;

const FlatServices = {
  processInitializeFlatListing: async ({ userId }: IFlatPayload) => {
    try {
      return await initializeFlatListing({ userId });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Unknown Error Occurred In initialize flat listing service"
        );
      }
    }
  },
  processUpdateFlatListing:async ({  }: IFlatPayload) => {
    try {
      
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Unknown Error Occurred In update flat listing service"
        );
      }
    }
  },
};

export default FlatServices;
