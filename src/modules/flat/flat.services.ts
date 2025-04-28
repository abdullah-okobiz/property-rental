import IFlat, {
  IFlatPayload,
  IGetAllFlatPayload,
  IGetAllFlatQuery,
  IGetAllFlatRequestedQuery,
} from "./flat.interfaces";
import FlatRepositories from "./flat.repositories";
import { join } from "path";
import { promises as fs } from "fs";

const {
  initializeFlatListing,
  updateFlatListing,
  findAllForHost,
  findAllListedFlat,
  deleteListedFlatItem,
} = FlatRepositories;

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
  processHostListedFlatProperties: async ({ userId }: IFlatPayload) => {
    try {
      return await findAllForHost({ userId });
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
  processGetAllListedFlat: async ({
    page,
    publishStatus,
    sort,
  }: IGetAllFlatRequestedQuery) => {
    try {
      const query: IGetAllFlatQuery = {};
      if (publishStatus) query.publishStatus = String(publishStatus);
      const payload: IGetAllFlatPayload = { query };
      if (page) payload.page = page;
      if (sort) payload.sort = sort;
      return await findAllListedFlat(payload);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred get all listed flat service");
      }
    }
  },
  processChangeStatus: async ({ flatId, reqBody }: IFlatPayload) => {
    try {
      const data = await updateFlatListing({ reqBody, flatId });
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In change status service");
      }
    }
  },
  processDeleteListedFlatItem: async ({ flatId }: IFlatPayload) => {
    try {
      const { images } = (await deleteListedFlatItem({ flatId })) as IFlat;
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
          "Unknown Error Occurred In delete listed flat item service"
        );
      }
    }
  },
};

export default FlatServices;
