import IUser from './../../Entities/Pojo/IUser';


export default interface IAuthService {

  login(login : IUser): Promise<IUser | null>;
  register(request: IUser): Promise<IUser>;

}