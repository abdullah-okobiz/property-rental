import { Document, Types } from "mongoose";

enum Status {
  IN_PROGRESS = "in_progress",
  PENDING = "pending",
  APPROVED = "approved",
}

interface IRent {
  title: string;
  images: [string];
  coverImage: string;
  description: string;
  floorPlan: {
    guestCount: number;
    bathCount: number;
    bedCount: number;
    bedRoomCount: number;
  };
  location: string;
  price: string;
  category: Types.ObjectId;
  listingFor: Types.ObjectId;
  cancellationPolicy: [string];
  houseRules: [string];
  allowableThings: [string];
  amenities: [Types.ObjectId];
  status: Status;
  host: Types.ObjectId;
}

export default IRent