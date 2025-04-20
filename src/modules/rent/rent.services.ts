import { join } from "path";
import { IRentPayload } from "./rent.interfaces";
import RentRepositories from "./rent.repositories";
import { promises as fs } from "fs";

const { initializedRentListing, creatingRentListingById, findAllForHost } =
  RentRepositories;
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
  processProgressRentListing: async ({ rentId, payload }: IRentPayload) => {
    try {
      const data = creatingRentListingById({ payload, rentId });
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
  processUploadImage: ({ images }: IRentPayload) => {
    const data = images?.map((item) => `/public/${item}`);
    return data;
  },
  processUnlinkImage: async ({ singleImage }: IRentPayload) => {
    const image = singleImage as String;
    const relativeImagePath = image.replace("/public/", "");
    const filePath = join(__dirname, "../../../public", relativeImagePath);
    try {
      await fs.unlink(filePath);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Unknown Error Occurred In unlink rent listing image service"
        );
      }
    }
  },
  processHostListedRentProperties: async ({ host }: IRentPayload) => {
    try {
      return await findAllForHost({ host });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Unknown Error Occurred In unlink rent listing image service"
        );
      }
    }
  },
};

export default RentServices;
