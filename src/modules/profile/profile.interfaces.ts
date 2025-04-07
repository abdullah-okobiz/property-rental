import mongoose, { Document } from "mongoose";

export interface IProfile extends Document {
  worksAt: string;
  location: string;
  languages: string[];
  intro: string;
  user: mongoose.Schema.Types.ObjectId;
}

export interface IWorksAtPayload {
  id: mongoose.Schema.Types.ObjectId;
  worksAt: string;
}

export interface ICreateLocationPayload {
  id: mongoose.Schema.Types.ObjectId;
  location: string;
}
