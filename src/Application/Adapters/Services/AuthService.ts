import IAuthService from '../../Ports/Services/IAuthService';
import {IUser} from '../../Entities/Pojo';
import IRepository from '../../Ports/Repositories/IRepository';
import {genSaltSync, hashSync, compareSync} from 'bcrypt'
import {v4 as uuidv4} from 'uuid';




export default class AuthService implements IAuthService{

   _userRepository: IRepository<IUser>;

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
    request.id = uuidv4()
    request.password = hashSync(request.password, salt)

    return await this._userRepository.save(request);
  }
}