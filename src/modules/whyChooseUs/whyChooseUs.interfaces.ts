import { Document, Types } from "mongoose";

interface IWhyChooseUs extends Document {
  whyChooseUsTitle: string;
  whyChooseUsDescription: string;
}

export interface IWhyChooseUsPayload {
  whyChooseUsTitle?: string;
  whyChooseUsDescription?: string;
  whyChooseUsId?: Types.ObjectId;
}

export default IWhyChooseUs;
