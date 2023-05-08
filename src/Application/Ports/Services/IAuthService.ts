import IUser from "../../Entities/Pojo/IUser";

export default interface IAuthService {
  login(login: IUser): Promise<IUser>;
  register(request: IUser, role: string): Promise<IUser>;
  resetPassword(password: string, id: string): Promise<void>;
  requestToResetPassword(email: string): Promise<void>;
}
