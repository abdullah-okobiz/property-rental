import { join } from "path";
import IRent, {
  ICreateRentPayload,
  IGetAllRentPayload,
  IGetAllRentQuery,
  IGetAllRentRequestedQuery,
  IRentPayload,
} from "./rent.interfaces";
import RentRepositories from "./rent.repositories";
import { promises as fs } from "fs";

const {
  initializedRentListing,
  creatingRentListingById,
  findAllForHost,
  findAllListedRent,
  deleteListedRentItem,
  createNewRent,
} = RentRepositories;
const RentServices = {
  processInitializeRentListing: async ({ host, payload }: IRentPayload) => {
    try {
      const data = await initializedRentListing({ host, payload });
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
  processCreateRent: async ({ images, payload }: ICreateRentPayload) => {
    try {
      const {
        allowableThings,
        amenities,
        cancellationPolicy,
        category,
        floorPlan,
        description,
        host,
        houseRules,
        listingFor,
        price,
        location,
        title,
      } = payload as IRent;
      const uploadedImages = images?.map(
        (item) => `/public/${item}`
      ) as string[];
      const postPayload: IRent = {
        images: uploadedImages,
        coverImage: uploadedImages[0],
        allowableThings,
        amenities,
        cancellationPolicy,
        category,
        floorPlan,
        description,
        host,
        houseRules,
        listingFor,
        price,
        location,
        title,
      };
      const data = await createNewRent(postPayload);
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
  processGetAllListedRent: async ({
    page,
    publishStatus,
    sort,
  }: IGetAllRentRequestedQuery) => {
    try {
      const query: IGetAllRentQuery = {};
      if (publishStatus) query.publishStatus = String(publishStatus);
      const payload: IGetAllRentPayload = { query };
      if (page) payload.page = page;
      if (sort) payload.sort = sort;
      return await findAllListedRent(payload);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred get all listed rent service");
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
