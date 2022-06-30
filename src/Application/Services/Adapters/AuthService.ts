import IAuthService from "../Ports/IAuthService";
import IUser from './../../Entities/Pojo/IUser';
import IRepository from "../../Repositories/Ports/IRepository";
import {genSaltSync, hashSync, compareSync} from 'bcrypt'



export default class AuthService implements IAuthService{

  private _userRepository: IRepository<IUser>;

  constructor(userRepository: IRepository<IUser>) {
    this._userRepository = userRepository
  }

  async login(login: IUser): Promise<IUser | null> {

    const user = await this._userRepository.get({username : login.username})
    if(!user) return null
    if(!compareSync(login.password, user.password)) return null
    return user
  }
  
  async register(request: IUser): Promise<IUser> {

    const salt = genSaltSync(10)
    request.password = hashSync(request.password, salt)
    return await this._userRepository.save(request);
  }
}