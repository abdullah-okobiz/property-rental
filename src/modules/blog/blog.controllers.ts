import { NextFunction, Request, Response } from "express";
import logger from "../../configs/logger.configs";
import BlogServices from "./blog.services";
const { processCreateBlog } = BlogServices;
const BlogControllers = {
  handleCreateBlog: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { blogTitle, blogDescription } = req.body;
      const blogImage = req?.file?.filename;
      const data = await processCreateBlog({
        blogImage,
        blogDescription,
        blogTitle,
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
};
export default BlogControllers;
