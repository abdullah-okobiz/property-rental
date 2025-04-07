import mongoose from "mongoose";
import {
  IBio,
  ICreateLanguagePayload,
  ICreateLocationPayload,
  IWorksAtPayload,
} from "./profile.interfaces";
import Profile from "./profile.models";

const ProfileRepositories = {
  createWorksAt: async ({ id, worksAt }: IWorksAtPayload) => {
    try {
      const data = await Profile.findOneAndUpdate(
        { user: id },
        { worksAt },
        { new: true, select: "worksAt" }
      );
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Unknown Error Occurred In Profile WorksAt Creation Operation"
        );
      }
    }
  },
  findWorksAt: async (payload: mongoose.Schema.Types.ObjectId) => {
    try {
      const data = await Profile.findOne({ user: payload }).select(
        "worksAt -_id"
      );
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Unknown Error Occurred In Profile WorksAt find Operation"
        );
      }
    }
  },
  createUserLocation: async ({ id, location }: ICreateLocationPayload) => {
    try {
      const data = await Profile.findOneAndUpdate(
        { user: id },
        { location },
        { new: true, select: "location -_id" }
      );
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Unknown Error Occurred In Profile Create Location Operation"
        );
      }
    }
  },
  findLocation: async (payload: mongoose.Schema.Types.ObjectId) => {
    try {
      const data = await Profile.findOne({ user: payload }).select(
        "location -_id"
      );
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Unknown Error Occurred In Profile location find Operation"
        );
      }
    }
  },
  createLanguage: async ({ id, languages }: ICreateLanguagePayload) => {
    try {
      console.log(id, languages);
      const data = await Profile.findOneAndUpdate(
        { user: id },
        { languages: languages },
        { new: true, select: "languages -_id" }
      );
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Unknown Error Occurred In Profile Create Language Operation"
        );
      }
    }
  },
  findLanguage: async (payload: mongoose.Schema.Types.ObjectId) => {
    try {
      const data = await Profile.findOne({ user: payload }).select(
        "language -_id"
      );
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Unknown Error Occurred In Profile Language find Operation"
        );
      }
    }
  },
  createBio: async ({ id, intro }: IBio) => {
    try {
      console.log(id, intro);
      const data = await Profile.findOneAndUpdate(
        { user: id },
        { intro },
        { new: true, select: "intro -_id" }
      );
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Unknown Error Occurred In Profile Create Bio Operation"
        );
      }
    }
  },
};

export default ProfileRepositories;
