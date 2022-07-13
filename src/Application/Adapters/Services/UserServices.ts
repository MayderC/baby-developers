import IUser from "../../Entities/Pojo/IUser";
import IUserService from "../../Ports/Services/IUserService";
import IUserRepository from "../../Ports/Repositories/IUserRepository";
import {v4 as uuidv4} from 'uuid';
import { genSaltSync, hashSync } from "bcrypt";

export default class UserService implements IUserService{
  
  _userRespository : IUserRepository<IUser>;

  constructor(userRepository : IUserRepository<IUser>) {
    this._userRespository = userRepository;
  }
  
  async getByUsernme(username: string): Promise<IUser> {
   return await this._userRespository.getByUsername(username);
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

  async delete(id: string): Promise<boolean> {
    return await this._userRespository.delete(id)
  }
  update(user: IUser): boolean {
    throw new Error("Method not implemented.");
  }
  
  async save(user: IUser): Promise<IUser> {
    user.id = uuidv4()
    const salt = genSaltSync(10)
    user.password = hashSync(user.password, salt)
    return this._userRespository.save(user)
  }
}