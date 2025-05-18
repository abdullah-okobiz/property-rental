import { IBlogPayload, IBLogQuery, IBlogUpdateField } from './blog.interfaces';
import Blog from './blog.models';

const BlogRepositories = {
  createBlog: async (payload: IBlogPayload) => {
    try {
      const newBlog = new Blog(payload);
      await newBlog.save();
      return newBlog;
    } catch (error) {
      throw new Error('Unknown Error Occurred In Blog Creation Operation');
    }
  },
  findAllBlogs: async ({ feature }: IBlogPayload) => {
    try {
      const query: IBLogQuery = {};
      if (feature) query.feature = feature;
      const data = await Blog.find(query).populate('feature', 'featureName _id');
      return data;
    } catch (error) {
      throw new Error('Unknown Error Occurred In Blog Retrieve Operation');
    }
  },
  updateOneField: async ({ field, blogId }: IBlogUpdateField) => {
    try {
      const updatedData = await Blog.findByIdAndUpdate(blogId, field, {
        new: true,
      });
      return updatedData;
    } catch (error) {
      throw new Error('Unknown Error Occurred In Blog Field Update Operation');
    }
  },
  updateOneBlog: async ({
    blogDescription,
    blogId,
    blogImage,
    blogTitle,
    feature,
    tags,
    slug,
  }: IBlogPayload) => {
    try {
      const updatedData = await Blog.findByIdAndUpdate(
        blogId,
        {
          $set: { slug, blogDescription, blogImage, blogTitle, feature, tags },
        },
        { new: true }
      );
      return updatedData;
    } catch (error) {
      throw new Error('Unknown Error Occurred In Blog Update Operation');
    }
  },
  deletOneBlog: async ({ blogId }: IBlogPayload) => {
    try {
      const data = await Blog.findByIdAndDelete(blogId);
      if (!data) throw new Error('Team Member delete failed');
      return;
    } catch (error) {
      throw new Error('Unknown Error Occurred In Blog Update Operation');
    }
  },
  findOneBlog: async ({ slug }: IBlogPayload) => {
    try {
      const data = await Blog.findOne({ slug }).populate('feature');
      return data;
    } catch (error) {
      throw new Error('Unknown Error Occurred In Single Blog Retrieve Operation');
    }
  },
};
export default BlogRepositories;
