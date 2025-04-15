import { NextFunction, Request, Response } from "express";
import logger from "../../configs/logger.configs";
import BlogServices from "./blog.services";
import { IBlogPayload } from "./blog.interfaces";
import mongoose from "mongoose";
const { processCreateBlog, processUpdateBlog, processDeleteBlog } =
  BlogServices;
const BlogControllers = {
  handleCreateBlog: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { blogTitle, blogDescription, feature, tags } =
        req.body as IBlogPayload;
      console.log(tags);
      const blogImage = req?.file?.filename;
      console.log(blogImage);
      const data = await processCreateBlog({
        blogImage,
        blogDescription,
        blogTitle,
        feature,
        tags,
      });
      res.status(201).json({
        status: "success",
        message: "blog create successful",
        data,
      });
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },
  handleUpdateBlog: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { blogImage } = req.blog as IBlogPayload;
    const oldImage = blogImage;
    const { blogDescription, blogTitle, tags, feature } =
      req.body as IBlogPayload;

    const newImage = req?.file?.filename;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ status: "error", message: "Invalid blog ID" });
      return;
    }
    const blogId = new mongoose.Types.ObjectId(id);
    try {
      const data = await processUpdateBlog({
        blogImage: newImage,
        blogOldImage: oldImage,
        blogDescription,
        blogTitle,
        feature,
        tags,
        blogId,
      });
      res.status(200).json({
        status: "success",
        message: "blog update successful",
        data,
      });
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },
  handleBlogDelete: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { blogImage } = req.blog as IBlogPayload;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ status: "error", message: "Invalid blog ID" });
      return;
    }
    const blogId = new mongoose.Types.ObjectId(id);
    try {
      await processDeleteBlog({ blogId, blogImage });
      res.status(200).json({
        status: "success",
        message: "blog delete successful",
      });
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      next();
    }
  },
};
export default BlogControllers;
