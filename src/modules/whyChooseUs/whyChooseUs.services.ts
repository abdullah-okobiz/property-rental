import { IWhyChooseUsPayload } from "./whyChooseUs.interfaces";
import WhyChooseUsRepositories from "./whyChooseUs.repositories";

const {
  createWhyChooseUs,
  deleteWhyChooseUs,
  findAllWhyChooseUs,
  updateWhyChooseUs,
} = WhyChooseUsRepositories;

const WhyChooseUsServices = {
  processCreateWhyChooseUs: async ({
    whyChooseUsTitle,
    whyChooseUsDescription,
  }: IWhyChooseUsPayload) => {
    try {
      const data = await createWhyChooseUs({
        whyChooseUsTitle,
        whyChooseUsDescription,
      });
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In create WhyChooseUs service");
      }
    }
  },

  processRetrieveAllWhyChooseUs: async () => {
    try {
      const data = await findAllWhyChooseUs();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Unknown Error Occurred In retrieve WhyChooseUs service"
        );
      }
    }
  },

  processUpdateWhyChooseUs: async (payload: IWhyChooseUsPayload) => {
    try {
      const data = await updateWhyChooseUs(payload);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In update WhyChooseUs service");
      }
    }
  },

  processDeleteWhyChooseUs: async (payload: IWhyChooseUsPayload) => {
    try {
      const data = await deleteWhyChooseUs(payload);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In delete WhyChooseUs service");
      }
    }
  },
};

export default WhyChooseUsServices;
