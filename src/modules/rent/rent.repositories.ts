import { documentPerPage } from "../../const";
import IRent, { IRentPayload, RentListingStatus } from "./rent.interfaces";
import Rent from "./rent.models";
const RentRepositories = {
  initializedRentListing: async ({ host }: IRentPayload) => {
    try {
      const data = new Rent({ host });
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
      const { price } = payload as IRent;
      if (!price) {
        console.log(payload);
        const data = await Rent.findByIdAndUpdate(rentId, payload, {
          new: true,
          runValidators: true,
        });
        return data;
      } else {
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
  getAllApprovedRentProperties: async (page: number) => {
    try {
      const skip = (page - 1) * documentPerPage;
      const [data, total] = await Promise.all([
        Rent.find({ status: RentListingStatus.APPROVED })
          .limit(documentPerPage)
          .skip(skip),
        Rent.countDocuments(),
      ]);
      return { data, total };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Unknown Error Occurred In Get All Rent Properties Operation"
        );
      }
    }
  },
};

export default RentRepositories;
