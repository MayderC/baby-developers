import IUser from "../../Entities/Pojo/IUser";
import {IRole} from "../../Entities/Pojo";

export default interface IAuthService {
  login(login: IUser): Promise<IUser>;
  register(request: IUser, role: IRole): Promise<IUser>;
  resetPassword(password: string, id: string): Promise<void>;
  requestToResetPassword(email: string): Promise<void>;
}
