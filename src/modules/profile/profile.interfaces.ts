import { Document, Types } from "mongoose";
import { DocumentType } from "../user/user.enums";

export interface IProfile extends Document {
  worksAt: string;
  location: string;
  languages: string[];
  intro: string;
  user: Types.ObjectId;
}

export interface IWorksAtPayload {
  id: Types.ObjectId;
  worksAt: string;
}

export interface ICreateLocationPayload {
  id: Types.ObjectId;
  location: string;
}

export interface ICreateLanguagePayload {
  id: Types.ObjectId;
  languages: string[];
}

export interface IBio {
  id: Types.ObjectId;
  intro: string;
}

export interface IAvatar {
  id: Types.ObjectId;
  avatar: string;
}

export interface IIdentityDocumentPaths {
  filename: string;
}

export interface IIdentityDocumentPayload {
  documents?: string[];
  userId?: Types.ObjectId;
  documentType: DocumentType;
}
