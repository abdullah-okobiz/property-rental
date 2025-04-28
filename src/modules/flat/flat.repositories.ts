import { documentPerPage } from "../../const";
import IFlat, {
  IFlatPayload,
  IGetAllFlatPayload,
  ListingPublishStatus,
} from "./flat.interfaces";
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
  updateFlatListing: async ({ flatId, reqBody }: IFlatPayload) => {
    try {
      const flat = await Flat.findById(flatId);
      const { price } = reqBody as IFlat;
      if (!price) {
        return await Flat.findByIdAndUpdate(flatId, reqBody, {
          new: true,
          runValidators: true,
        });
      } else {
        if (
          flat?.publishStatus === ListingPublishStatus.APPROVED ||
          flat?.publishStatus === ListingPublishStatus.PENDING
        ) {
          return await Flat.findByIdAndUpdate(
            flatId,
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
        return await Flat.findByIdAndUpdate(
          flatId,
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
        throw new Error("Unknown Error Occurred In Flat Initialized Operation");
      }
    }
  },
  findAllForHost: async ({ userId }: IFlatPayload) => {
    try {
      const data = await Flat.find({ host: userId });
      if (!data) return null;
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Unknown Error Occurred In Get Rent Properties For Host Operation"
        );
      }
    }
  },
  findAllListedFlat: async ({ query, page, sort }: IGetAllFlatPayload) => {
    try {
      const currentPage = page ?? 1;
      const skip = (currentPage - 1) * documentPerPage;
      const sortOption: Record<string, 1 | -1> | undefined =
        sort === 1 || sort === -1 ? { createdAt: sort } : undefined;
      const [data, total] = await Promise.all([
        Flat.find(query).skip(skip).sort(sortOption),
        Flat.countDocuments(query),
      ]);
      return { data, total };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Unknown Error Occurred In Get All Listed Flat Operation"
        );
      }
    }
  },
  deleteListedFlatItem: async ({ flatId }: IFlatPayload) => {
    try {
      const data = await Flat.findByIdAndDelete(flatId);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Unknown Error Occurred In delete listed flat item Operation"
        );
      }
    }
  },
};

export default FlatRepositories;
