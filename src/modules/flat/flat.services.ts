import IFlat, { IFlatPayload } from "./flat.interfaces";
import FlatRepositories from "./flat.repositories";

const { initializeFlatListing, updateFlatListing } = FlatRepositories;

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
  processUpdateFlatListing: async ({ flatId, reqBody }: IFlatPayload) => {
    try {
      return await updateFlatListing({ flatId, reqBody });
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
  processUploadImage: async ({ flatId, images }: IFlatPayload) => {
    try {
      const uploadedImages = images?.map(
        (item) => `/public/${item}`
      ) as string[];
      const reqBody: IFlat = {
        images: uploadedImages,
        coverImage: uploadedImages[0],
      };
      return await updateFlatListing({ flatId, reqBody });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In upload image service");
      }
    }
  },
};

export default FlatServices;
