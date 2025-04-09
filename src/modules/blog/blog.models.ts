import { model, Model, Schema } from "mongoose";
import IBlogInterfces from "./blog.interfaces";

const BlogSchema = new Schema<IBlogInterfces>({
  blogTitle: { type: String, default: null },
  blogImage: { type: String, default: null },
  blogDescription: { type: String, default: null },
},{timestamps:true});

const Blog: Model<IBlogInterfces> = model<IBlogInterfces>("Blog", BlogSchema);

export default Blog;
