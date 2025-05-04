import mongoose, { Types } from "mongoose";
import { documentPerPage } from "../../const";
import User from "../user/user.model";
import IRent, {
  IGetAllRentPayload,
  IRentPayload,
  RentListingStatus,
} from "./rent.interfaces";
import Rent from "./rent.models";
const RentRepositories = {
  initializedRentListing: async ({ host, payload }: IRentPayload) => {
    try {
      const { listingFor } = payload as IRent;
      const data = new Rent({ host, listingFor });
      await data.save();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In Rent Initialized Operation");
      }
    }
  },
  creatingRentListingById: async ({ payload, rentId }: IRentPayload) => {
    try {
      const rent = await Rent.findById(rentId);
      const { price } = payload as IRent;
      if (!price) {
        const data = await Rent.findByIdAndUpdate(rentId, payload, {
          new: true,
          runValidators: true,
        });
        return data;
      } else {
        if (
          rent?.status === RentListingStatus.PUBLISHED ||
          rent?.status === RentListingStatus.PENDING
        ) {
          const data = await Rent.findByIdAndUpdate(
            rentId,
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
          return data;
        }
        const data = await Rent.findByIdAndUpdate(
          rentId,
          {
            $set: {
              price,
              status: RentListingStatus.PENDING,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        return data;
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In Rent Update Operation");
      }
    }
  },
  findOneWithHostAndRentId: async ({ host, rentId }: IRentPayload) => {
    try {
      const data = await Rent.findOne({ host, _id: rentId });
      if (!data) return null;
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Unknown Error Occurred In Get One Rent Properties Operation"
        );
      }
    }
  },
  findAllForHost: async ({ host }: IRentPayload) => {
    try {
      const data = await Rent.find({ host });
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
  createNewRent: async (payload: IRent) => {
    try {
      const newRent = new Rent(payload);
      await newRent.save();
      return newRent;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In Rent Creation Operation");
      }
    }
  },
  findAllListedRent: async ({ query, page, sort }: IGetAllRentPayload) => {
    try {
      const currentPage = page ?? 1;
      const skip = (currentPage - 1) * documentPerPage;
      const sortOption: Record<string, 1 | -1> | undefined =
        sort === 1 || sort === -1 ? { createdAt: sort } : undefined;
      if (query.email) {
        const host = await User.findOne({ email: query.email });
        if (host) {
          query.host = host._id as Types.ObjectId;
          delete query.email;
        } else {
          return { data: [], total: 0 };
        }
      }
      const [data, total] = await Promise.all([
        Rent.find(query)
          .skip(skip)
          .sort(sortOption)
          .populate("host")
          .populate("listingFor")
          .populate("category")
          .populate("amenities"),
        Rent.countDocuments(query),
      ]);
      return { data, total };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Unknown Error Occurred In Get All Listed Rent Operation"
        );
      }
    }
  },
  deleteListedRentItem: async ({ rentId }: IRentPayload) => {
    try {
      const data = await Rent.findByIdAndDelete(rentId);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Unknown Error Occurred In delete listed rent item Operation"
        );
      }
    }
  },
};

export default RentRepositories;
