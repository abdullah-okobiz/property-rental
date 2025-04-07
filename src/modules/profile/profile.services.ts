import mongoose from "mongoose";
import { ICreateLocationPayload, IWorksAtPayload } from "./profile.interfaces";
import ProfileRepositories from "./profile.repositories";

const { createWorksAt, findWorksAt, createUserLocation, findLocation } =
  ProfileRepositories;

const ProfileServices = {
  processCreateWorksAt: async (payload: IWorksAtPayload) => {
    try {
      const data = await createWorksAt(payload);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In Create Works At service");
      }
    }
  },
  processRetrieveWorksAt: async (payload: mongoose.Schema.Types.ObjectId) => {
    try {
      const data = await findWorksAt(payload);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In retrieve Works At service");
      }
    }
  },
  processCreateLocation: async (payload: ICreateLocationPayload) => {
    try {
      const data = await createUserLocation(payload);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In Create Works At service");
      }
    }
  },
  processRetrieveLocation: async (payload: mongoose.Schema.Types.ObjectId) => {
    try {
      const data = await findLocation(payload);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In retrieve Works At service");
      }
    }
  },
};

export default ProfileServices;
