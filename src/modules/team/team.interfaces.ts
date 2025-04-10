import { Document, Types } from "mongoose";

interface ITeam extends Document {
  teamMemberName: string;
  teamMemberDesignation: string;
  teamMemberImage: string;
}

export interface ITeamPayload {
  teamMemberName?: string;
  teamMemberDesignation?: string;
  teamMemberImage?: string;
  teamMemberId?: Types.ObjectId;
  teamMemberOldImage?: string;
}

export default ITeam;
