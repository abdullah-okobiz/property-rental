import IFlat, { IFlatPayload, ListingPublishStatus } from "./flat.interfaces";
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
};

export default FlatRepositories;
