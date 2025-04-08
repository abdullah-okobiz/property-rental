import { join } from "path";
import { IBlogPayload } from "./blog.interfaces";
import BlogRepositories from "./blog.repositories";
const { createBlog } = BlogRepositories;
import { promises as fs } from "fs";

const BlogServices = {
  processCreateBlog: async ({
    blogDescription,
    blogTitle,
    blogImage,
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
};
export default BlogServices;
