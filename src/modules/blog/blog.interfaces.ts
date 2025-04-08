import { Document } from "mongoose";

export interface IBlogPayload{
    blogTitle:string;
    blogImage?:string;
    blogDescription:string;
}

interface IBlogInterfces extends Document{
    blogTitle:string;
    blogImage:string;
    blogDescription:string;
}

export default IBlogInterfces