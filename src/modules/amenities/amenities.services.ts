import { promises as fs } from "fs";
import { join } from "path";
import { IAmenitiesPayload } from "./amenities.interfaces";
import AmenitiesRepositories from "./amenities.repositories";
const { createAmenities, deleteAmenities, findAllAmenities } =
  AmenitiesRepositories;
const AmenitiesServices = {
  processCreateAmenities: async ({
    amenitiesImage,
    amenitiesLabel,
  }: IAmenitiesPayload) => {
    const filePath = join(
      __dirname,
      "../../../public",
      amenitiesImage as string
    );
    try {
      const data = await createAmenities({
        amenitiesImage: `/public/${amenitiesImage}`,
        amenitiesLabel,
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
        throw new Error("Unknown Error Occurred In create amenities service");
      }
    }
  },

  processRetrieveAllAmenities: async () => {
    try {
      const data = await findAllAmenities();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In retrieve amenities service");
      }
    }
  },

  processDeleteAmenities: async ({
    amenitiesId,
    amenitiesImage,
  }: IAmenitiesPayload) => {
    const image = amenitiesImage as string;
    const relativeImagePath = image.replace("/public/", "");
    const filePath = join(__dirname, "../../../public", relativeImagePath);
    try {
      await fs.unlink(filePath);
      await deleteAmenities({ amenitiesId });
      return;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In delete amenities service");
      }
    }
  },
};

export default AmenitiesServices;
