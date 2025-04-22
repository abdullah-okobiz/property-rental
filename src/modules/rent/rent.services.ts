import { join } from "path";
import IRent, { IRentPayload } from "./rent.interfaces";
import RentRepositories from "./rent.repositories";
import { promises as fs } from "fs";

const {
  initializedRentListing,
  creatingRentListingById,
  findAllForHost,
  getAllApprovedRentProperties,
  deleteListedRentItem,
} = RentRepositories;
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
      const data = await creatingRentListingById({ payload, rentId });
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
  processUploadImage: async ({ images, rentId }: IRentPayload) => {
    try {
      const uploadedImages = images?.map(
        (item) => `/public/${item}`
      ) as string[];
      const payload: IRent = {
        images: uploadedImages,
        coverImage: uploadedImages[0],
      };
      const data = await creatingRentListingById({ payload, rentId });
      console.log(data);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Unknown Error Occurred In rent listing image upload service"
        );
      }
    }
  },
  processUnlinkImage: async ({ singleImage, images, rentId }: IRentPayload) => {
    const image = singleImage as String;
    const relativeImagePath = image.replace("/public/", "");
    const filePath = join(__dirname, "../../../public", relativeImagePath);
    try {
      const payload: IRent = {};
      if (images) {
        payload.coverImage = images[0];
        payload.images = images;
      }
      await Promise.all([
        fs.unlink(filePath),
        creatingRentListingById({ payload, rentId }),
      ]);
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
  processChangeStatus: async ({ rentId, payload }: IRentPayload) => {
    try {
      const data = await creatingRentListingById({ payload, rentId });
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In change status service");
      }
    }
  },
  processGetApprovedRentListedItems: async ({ page }: IRentPayload) => {
    try {
      const data = await getAllApprovedRentProperties({ page });
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Unknown Error Occurred In retrieve approved rent listed items service"
        );
      }
    }
  },
  processDeleteListedRentItem: async ({ rentId }: IRentPayload) => {
    try {
      const { images } = (await deleteListedRentItem({ rentId })) as IRent;
      if (images !== null) {
        const relativeImagePath = images?.map((item) =>
          item.replace("/public/", "")
        );
        const filePaths = relativeImagePath?.map((item) =>
          join(__dirname, "../../../public", item)
        );
        await Promise.all([filePaths?.map((item) => fs.unlink(item))]);
        return;
      }
      return;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Unknown Error Occurred In delete listed rent item service"
        );
      }
    }
  },
};

export default RentServices;
