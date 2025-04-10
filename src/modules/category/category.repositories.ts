import { ICategoryPayload } from "./category.interfaces";
import Category from "./category.models";

const CategoryRepositories = {
  createCategory: async (payload: ICategoryPayload) => {
    try {
      const newCategory = new Category(payload);
      await newCategory.save();
      return newCategory;
    } catch (error) {
      throw new Error("Unknown Error Occurred In Feature Creation Operation");
    }
  },
  findCategories: async ({ feature }: ICategoryPayload) => {
    try {
      const query = feature ? { feature } : {};
      const data = await Category.find(query);
      return data;
    } catch (error) {
      throw new Error("Unknown Error Occurred In Category Retrive Operation");
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
      throw new Error("Unknown Error Occurred In category update Operation");
    }
  },
  daleteCategory: async ({ categoryId }: ICategoryPayload) => {
    try {
      const updatedData = await Category.findByIdAndDelete(categoryId);
      if (!updatedData) throw new Error("category delete fail");
      return;
    } catch (error) {
      throw new Error("Unknown Error Occurred In category update Operation");
    }
  },
};

export default CategoryRepositories;
