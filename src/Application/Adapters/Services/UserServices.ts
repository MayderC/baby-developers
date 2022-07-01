import IUser from "../../Entities/Pojo/IUser";
import IUserService from "../../Ports/Services/IUserService";
import IUserRepository from "../../Ports/Repositories/IUserRepository";

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

  async getByUsername(): Promise<IUser>{
    const user: IUser = await this._userRespository.getByUsername("")
    return user
  }

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