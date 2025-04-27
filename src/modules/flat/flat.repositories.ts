import { IFlatPayload } from "./flat.interfaces";
import Flat from "./flat.models";

const FlatRepositories = {
  initializeFlatListing: async ({ userId }: IFlatPayload) => {
    try {
      const data = new Flat({ host: userId });
      await data.save();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In Flat Initialized Operation");
      }
    }
  },
};

export default FlatRepositories;
