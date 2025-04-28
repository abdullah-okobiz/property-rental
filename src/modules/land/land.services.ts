import ILand, {
  IGetAllLandPayload,
  IGetAllLandQuery,
  IGetAllLandRequestedQuery,
  ILandPayload,
} from "./land.interfaces";
import LandRepositories from "./land.repositories";
import { join } from "path";
import { promises as fs } from "fs";

const {
  deleteListedLandItem,
  findAllForHost,
  findAllListedLand,
  initializeLandListing,
  updateLandListing,
} = LandRepositories;

const LandServices = {
  processInitializeLandListing: async ({ userId }: ILandPayload) => {
    try {
      return await initializeLandListing({ userId });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Unknown Error Occurred In initialize land listing service"
        );
      }
    }
  },
  processUpdateLandListing: async ({ landId, reqBody }: ILandPayload) => {
    try {
      return await updateLandListing({ landId, reqBody });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Unknown Error Occurred In update land listing service"
        );
      }
    }
  },
  processUploadImage: async ({ landId, images }: ILandPayload) => {
    try {
      const uploadedImages = images?.map(
        (item) => `/public/${item}`
      ) as string[];
      const reqBody: ILand = {
        images: uploadedImages,
        coverImage: uploadedImages[0],
      };
      return await updateLandListing({ landId, reqBody });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In upload image service");
      }
    }
  },
  processUnlinkImage: async ({ singleImage, images, landId }: ILandPayload) => {
    const image = singleImage as String;
    const relativeImagePath = image.replace("/public/", "");
    const filePath = join(__dirname, "../../../public", relativeImagePath);
    try {
      const reqBody: ILand = {};
      if (images) {
        reqBody.coverImage = images[0];
        reqBody.images = images;
      }
      await Promise.all([
        fs.unlink(filePath),
        updateLandListing({ reqBody, landId }),
      ]);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Unknown Error Occurred In unlink land listing image service"
        );
      }
    }
  },
  processHostListedLandProperties: async ({ userId }: ILandPayload) => {
    try {
      return await findAllForHost({ userId });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Unknown Error Occurred In unlink land listing image service"
        );
      }
    }
  },
  processGetAllListedLand: async ({
    page,
    publishStatus,
    sort,
  }: IGetAllLandRequestedQuery) => {
    try {
      const query: IGetAllLandQuery = {};
      if (publishStatus) query.publishStatus = String(publishStatus);
      const payload: IGetAllLandPayload = { query };
      if (page) payload.page = page;
      if (sort) payload.sort = sort;
      return await findAllListedLand(payload);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred get all listed land service");
      }
    }
  },
  processDeleteListedLandItem: async ({ landId }: ILandPayload) => {
    try {
      const { images } = (await deleteListedLandItem({ landId })) as ILand;
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
          "Unknown Error Occurred In delete listed land item service"
        );
      }
    }
  },
};

export default LandServices;
