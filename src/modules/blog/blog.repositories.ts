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
  findAllBlogs: async () => {
    try {
      const data = await Blog.find({}).populate("feature", "featureName _id");
      return data;
    } catch (error) {
      throw new Error("Unknown Error Occurred In Blog Retrieve Operation");
    }
  },
  updateOneBlog: async ({
    blogDescription,
    blogId,
    blogImage,
    blogTitle,
    feature,
    tags,
  }: IBlogPayload) => {
    try {
      const updatedData = await Blog.findByIdAndUpdate(
        blogId,
        {
          $set: { blogDescription, blogImage, blogTitle, feature, tags },
        },
        { new: true }
      );
      return updatedData;
    } catch (error) {
      throw new Error("Unknown Error Occurred In Blog Update Operation");
    }
  },
  deletOneBlog: async ({ blogId }: IBlogPayload) => {
    try {
      const data = await Blog.findByIdAndDelete(blogId);
      if (!data) throw new Error("Team Member delete failed");
      return;
    } catch (error) {
      throw new Error("Unknown Error Occurred In Blog Update Operation");
    }
  },
  findOneBlog: async ({ blogId }: IBlogPayload) => {
    try {
      const data = await Blog.findById(blogId).populate("feature");
      return data;
    } catch (error) {
      throw new Error(
        "Unknown Error Occurred In Single Blog Retrieve Operation"
      );
    }
  },
};
export default BlogRepositories;
