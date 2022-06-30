import IUser from "../../Entities/Pojo/IUser";
import IUserService from "../Ports/IUserService";
import IUserRepository from '../../Repositories/Ports/IRepository';

export default class UserService implements IUserService{
  
  _userRespository : IUserRepository<IUser>;

  constructor(userRepository : IUserRepository<IUser>) {
    this._userRespository = userRepository;
  }

  async getAll(): Promise<Array<IUser>> {
    const users : Array<IUser> = await this._userRespository.getAll();
    return users;
  }
  async getById(id: string): Promise<IUser | null> {
    const user: IUser | null = await this._userRespository.getById(id);
    return user;
  }

  // getByUsername(): Promise<IUser>{
  //   const user: IUser = await this._userRespository.
  //   return user
  // }

  delete(id: string): boolean {
    throw new Error("Method not implemented.");
  }
  update(user: IUser): boolean {
    throw new Error("Method not implemented.");
  }
  save(user: IUser): IUser {
    throw new Error("Method not implemented.");
  }
}