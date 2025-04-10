import { TokenPayload } from "../interfaces/jwtPayload.interfaces";
import ITeam from "../modules/team/team.interfaces";
import { IUser } from "../modules/user/user.interfaces";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      authenticateTokenDecoded:TokenPayload,
      teamMember?:ITeam
    }
  }
}
