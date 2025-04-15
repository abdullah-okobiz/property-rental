import path, { join } from "path";
import { IBlogPayload } from "./blog.interfaces";
import BlogRepositories from "./blog.repositories";
const { createBlog, updateOneBlog } = BlogRepositories;
import { promises as fs } from "fs";

const BlogServices = {
  processCreateBlog: async ({
    blogDescription,
    blogTitle,
    blogImage,
    feature,
    tags,
  }: IBlogPayload) => {
    const filePath = join(
      __dirname,
      "../../../public",
      blogImage as string
    ) as string;
    try {
      const data = await createBlog({
        blogDescription,
        blogTitle,
        blogImage: `/public/${blogImage}`,
        feature,
        tags,
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
        throw new Error("Unknown Error Occurred In create blog service");
      }
    }
  },
  processUpdateBlog: async ({
    blogDescription,
    blogTitle,
    blogImage,
    feature,
    tags,
    blogOldImage,
    blogId,
  }: IBlogPayload) => {
    const image = blogOldImage as string;
    const relativeImagePath = path.basename(image);
    const oldFilePath = join(__dirname, "../../../public", relativeImagePath);
    const newImageFilePath = join(
      __dirname,
      "../../../public",
      blogImage as string
    );
    try {
      const updatedData = await updateOneBlog({
        blogDescription,
        blogTitle,
        feature,
        tags,
        blogId,
        blogImage: `/public/${blogImage}`,
      });
      if (!updatedData) {
        fs.unlink(newImageFilePath);
      }
      fs.unlink(oldFilePath);
      return updatedData;
    } catch (error) {
      if (error instanceof Error) {
        await fs.unlink(newImageFilePath);
        throw error;
      } else {
        await fs.unlink(newImageFilePath);
        throw new Error("Unknown Error Occurred In update blog service");
      }
    }
  },
};
export default BlogServices;
