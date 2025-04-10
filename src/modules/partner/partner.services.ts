import { join } from "path";
import { IPartnerPayload } from "./partner.interfaces";
import PartnerRepositories from "./partner.repositories";
import { promises as fs } from "fs";

const { createPartner, deletePartner, findAllPartners, updatePartner } =
  PartnerRepositories;

const PartnerServices = {
  processCreatePartner: async ({ partnerImage }: IPartnerPayload) => {
    const filePath = join(
      __dirname,
      "../../../public",
      partnerImage as string
    ) as string;
    try {
      const data = await createPartner({
        partnerImage: `/public/${partnerImage}`,
      });
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
        throw new Error("Unknown Error Occurred In create partner service");
      }
    }
  },

  processRetrieveAllPartners: async () => {
    try {
      const data = await findAllPartners();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In retrieve partner service");
      }
    }
  },

  processUpdatePartner: async ({ partnerImage }: IPartnerPayload) => {
    const filePath = join(
      __dirname,
      "../../../public",
      partnerImage as string
    ) as string;
    try {
      const data = await updatePartner({
        partnerImage: `/public/${partnerImage}`,
      });
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
        throw new Error("Unknown Error Occurred In create partner service");
      }
    }
  },

  processDeletePartner: async (payload: IPartnerPayload) => {
    try {
      const data = await deletePartner(payload);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In delete partner service");
      }
    }
  },
};

export default PartnerServices;
