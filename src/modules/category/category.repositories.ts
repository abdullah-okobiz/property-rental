import { ICategoryPayload } from "./category.interfaces";
import Category from "./category.models";

const CategoryRepositories = {
  createCategory: async (payload: ICategoryPayload) => {
    try {
      const newCategory = new Category(payload);
      await newCategory.save();
      return newCategory;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Unknown Error Occurred In Category Creation Operation"
        );
      }
    }
  },
  findCategories: async ({ feature }: ICategoryPayload) => {
    try {
      const query = feature ? { feature } : {};
      const data = await Category.find(query).populate(
        "feature",
        "featureName _id"
      );
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "Unknown Error Occurred In Category Retrieve Operation"
        );
      }
    }
  },
  updateCategory: async ({
    categoryId,
    categoryName,
    feature,
  }: ICategoryPayload) => {
    try {
      const updatedData = await Category.findByIdAndUpdate(
        categoryId,
        { $set: { categoryName, feature } },
        { new: true }
      );
      return updatedData;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In category update Operation");
      }
    }
  },
  deleteCategory: async ({ categoryId }: ICategoryPayload) => {
    try {
      const updatedData = await Category.findByIdAndDelete(categoryId);
      if (!updatedData) throw new Error("category delete fail");
      return;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown Error Occurred In category delete Operation");
      }
    }
  },
};

export default CategoryRepositories;
