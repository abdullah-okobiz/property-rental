import IAmenities, { IAmenitiesPayload } from "./amenities.interfaces";
import Amenities from "./amenities.models";

const AmenitiesRepositories = {
  createAmenities: async (payload: IAmenitiesPayload) => {
    try {
      const newAmenities = new Amenities(payload);
      await newAmenities.save();
      return newAmenities;
    } catch (error) {
      throw new Error("Unknown Error Occurred In Amenities Creation Operation");
    }
  },
  findOneAmenities: async ({ amenitiesId }: IAmenitiesPayload) => {
    try {
      const data = await Amenities.findById(amenitiesId);
      return data;
    } catch (error) {
      throw new Error("Unknown Error Occurred In Amenities Retrieve Operation");
    }
  },
  findAllAmenities: async () => {
    try {
      const data = await Amenities.find({});
      return data;
    } catch (error) {
      throw new Error("Unknown Error Occurred In Amenities Retrieve Operation");
    }
  },

  deleteAmenities: async ({ amenitiesId }: IAmenitiesPayload) => {
    try {
      console.log(amenitiesId);
      const deletedData = await Amenities.findByIdAndDelete(amenitiesId);
      if (!deletedData) throw new Error("Amenities delete failed");
      return;
    } catch (error) {
      throw new Error("Unknown Error Occurred In Amenities Delete Operation");
    }
  },
};

export default AmenitiesRepositories;
