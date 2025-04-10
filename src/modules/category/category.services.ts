import { ICategoryPayload } from "./category.interfaces";
import CategoryRepositories from "./category.repositories";
const { createCategory, updateCategory, findCategories, daleteCategory } =
  CategoryRepositories;
const CategoryServices = {
  processCreateCategory: async (payload: ICategoryPayload) => {
    try {
      const data = await createCategory(payload);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In create feature service");
      }
    }
  },
  processUpdateCategory: async (payload: ICategoryPayload) => {
    try {
      const data = await updateCategory(payload);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In update category service");
      }
    }
  },
  processRetriveCategory: async (payload: ICategoryPayload) => {
    try {
      const data = await findCategories(payload);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In Retrieve Category service");
      }
    }
  },
  processDeleteCategory: async (payload: ICategoryPayload) => {
    try {
      const data = await daleteCategory(payload);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In delete category service");
      }
    }
  },
};

export default CategoryServices;
