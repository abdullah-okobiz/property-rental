import { Types } from "mongoose";
import {
  IAvatar,
  IBio,
  ICreateLanguagePayload,
  ICreateLocationPayload,
  IIdentityDocumentPayload,
  IWorksAtPayload,
} from "./profile.interfaces";
import ProfileRepositories from "./profile.repositories";
import { join } from "path";
import { promises as fs } from "fs";

const {
  createWorksAt,
  findWorksAt,
  createUserLocation,
  findLocation,
  createLanguage,
  findLanguage,
  createBio,
  findBio,
  createAvatar,
  findAvatar,
  uploadIdentityDocuments,
} = ProfileRepositories;

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
  processRetrieveWorksAt: async (payload: Types.ObjectId) => {
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
  processRetrieveLocation: async (payload: Types.ObjectId) => {
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
  processCreateLanguage: async (payload: ICreateLanguagePayload) => {
    try {
      console.log(payload);
      const data = await createLanguage(payload);
      console.log(data);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In Create Language service");
      }
    }
  },
  processRetrieveLanguage: async (payload: Types.ObjectId) => {
    try {
      const data = await findLanguage(payload);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In retrieve Language service");
      }
    }
  },
  processCreateBio: async (payload: IBio) => {
    try {
      const data = await createBio(payload);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In Create Bio service");
      }
    }
  },
  processRetrieveBio: async (payload: Types.ObjectId) => {
    try {
      const data = await findBio(payload);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In retrieve bio  service");
      }
    }
  },
  processCreateAvatar: async ({ avatar, id }: IAvatar) => {
    const filePath = join(__dirname, "../../../public", avatar) as string;
    try {
      const data = await createAvatar({ id, avatar: `/public/${avatar}` });
      if (!data) {
        try {
          await fs.unlink(filePath);
          throw new Error("Image Uploading Failed");
        } catch (error) {
          throw error;
        }
      }
      return data;
    } catch (error) {
      if (error instanceof Error) {
        await fs.unlink(filePath);
        throw error;
      } else {
        await fs.unlink(filePath);
        throw new Error("Unknown Error Occurred In Create Avatar service");
      }
    }
  },
  processRetrieveAvatar: async (payload: Types.ObjectId) => {
    try {
      const data = await findAvatar(payload);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In retrieve avatar service");
      }
    }
  },
  processIdentityUpload: async ({
    documents,
    userId,
    documentType,
  }: IIdentityDocumentPayload) => {
    try {
      const uploadedDocuments = documents?.map(
        (item) => `/public/${item}`
      ) as string[];
      await uploadIdentityDocuments({
        documentType,
        documents: uploadedDocuments,
        userId,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred identity upload service");
      }
    }
  },
};

export default ProfileServices;
