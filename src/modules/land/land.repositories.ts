import { documentPerPage } from "../../const";
import ILand, {
  IGetAllLandPayload,
  ILandPayload,
  ListingPublishStatus,
} from "./land.interfaces";
import Land from "./land.models";

const LandRepositories = {
  initializeLandListing: async ({ userId }: ILandPayload) => {
    try {
      const data = new Land({ host: userId });
      await data.save();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In Land Initialized Operation");
      }
    }
  },
  updateLandListing: async ({ landId, reqBody }: ILandPayload) => {
    try {
      const land = await Land.findById(landId);
      const { price } = reqBody as ILand;
      if (!price) {
        console.log(reqBody)
        return await Land.findByIdAndUpdate(landId, reqBody, {
          new: true,
          runValidators: true,
        });
      } else {
        if (
          land?.publishStatus === ListingPublishStatus.APPROVED ||
          land?.publishStatus === ListingPublishStatus.PENDING
        ) {
          return await Land.findByIdAndUpdate(
            landId,
            {
              $set: {
                price,
              },
            },
            {
              new: true,
              runValidators: true,
            }
          );
        }
        return await Land.findByIdAndUpdate(
          landId,
          {
            $set: {
              price,
              publishStatus: ListingPublishStatus.PENDING,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In Land update Operation");
      }
    }
  },
  findAllForHost: async ({ userId }: ILandPayload) => {
    try {
      const data = await Land.find({ host: userId });
      if (!data) return null;
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Unknown Error Occurred In Get All Host Listed Properties Operation"
        );
      }
    }
  },
  findAllListedLand: async ({ query, page, sort }: IGetAllLandPayload) => {
    try {
      const currentPage = page ?? 1;
      const skip = (currentPage - 1) * documentPerPage;
      const sortOption: Record<string, 1 | -1> | undefined =
        sort === 1 || sort === -1 ? { createdAt: sort } : undefined;
      const [data, total] = await Promise.all([
        Land.find(query).skip(skip).sort(sortOption),
        Land.countDocuments(query),
      ]);
      return { data, total };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Unknown Error Occurred In Get All Listed Land Operation"
        );
      }
    }
  },
  deleteListedLandItem: async ({ landId }: ILandPayload) => {
    try {
      const data = await Land.findByIdAndDelete(landId);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Unknown Error Occurred In delete listed land item Operation"
        );
      }
    }
  },
};

export default LandRepositories;
