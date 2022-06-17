import IUser from "../../Entities/Poco/IUser";
import IUserService from "../Ports/IUserService";
import IUserRepository from './../../Repositories/Ports/IUserRepository';

export default class UserService implements IUserService{
  
  _userRespository : IUserRepository;

  constructor(userRepository : IUserRepository){

    this._userRespository = userRepository;
  }

  async getAll(): Promise<Array<IUser>> {
    
    const users : Array<IUser> = this._userRespository.getAll();
    return users;
  }
  
  getById(id: string): IUser {
    throw new Error("Method not implemented.");
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