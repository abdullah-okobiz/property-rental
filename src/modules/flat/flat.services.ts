import IFlat, { IFlatPayload } from "./flat.interfaces";
import FlatRepositories from "./flat.repositories";
import { join } from "path";
import { promises as fs } from "fs";

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
  processUnlinkImage: async ({ singleImage, images, flatId }: IFlatPayload) => {
    const image = singleImage as String;
    const relativeImagePath = image.replace("/public/", "");
    const filePath = join(__dirname, "../../../public", relativeImagePath);
    try {
      const reqBody: IFlat = {};
      if (images) {
        reqBody.coverImage = images[0];
        reqBody.images = images;
      }
      await Promise.all([
        fs.unlink(filePath),
        updateFlatListing({ reqBody, flatId }),
      ]);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Unknown Error Occurred In unlink flat listing image service"
        );
      }
    }
  },
};

export default FlatServices;
