import { IBlogPayload } from "./blog.interfaces";
import Blog from "./blog.models";

const BlogRepositories = {
  createBlog: async (payload: IBlogPayload) => {
    try {
      const newBlog = new Blog(payload);
      await newBlog.save();
      return newBlog;
    } catch (error) {
      throw new Error("Unknown Error Occurred In Blog Creation Operation");
    }
  },
  // findAllBlogs
};
export default BlogRepositories;
