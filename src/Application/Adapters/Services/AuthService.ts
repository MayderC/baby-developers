import IAuthService from "../../Ports/Services/IAuthService";
import { IUser } from "../../Entities/Pojo";
import IRepository from "../../Ports/Repositories/IRepository";
import { genSaltSync, hashSync, compareSync } from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import BaseRepository from "../Repositories/BaseRepository";
import { Role } from "./../../Entities/Models/Role";
import { User } from "../../Entities/Models";
import { SALT } from "../../constants";

export default class AuthService implements IAuthService {
  _userRepository: IRepository<IUser>;
  _userRoleRepository: BaseRepository<Role>;

  constructor(
    userRepository: IRepository<IUser>,
    userRolRepository: BaseRepository<Role>
  ) {
    this._userRepository = userRepository;
    this._userRoleRepository = userRolRepository;
    this._userRoleRepository.setEntity(Role);
  }

  async login(login: IUser): Promise<IUser | null> {
    const user = await this._userRepository.get({ username: login.username });
    if (!user) return null;
    if (!compareSync(login.password, user.password)) return null;

    return user;
  }

  async register(user: User, role: string): Promise<IUser> {
    user.id = uuidv4();
    user.password = hashSync(user.password, genSaltSync(SALT));
    user.isActive = true;

    try {
      user.roles = [await this._userRoleRepository.get({ name: role })];
    } catch (error) {
      throw new Error(`invalid role ${role}`);
    }
    return await this._userRepository.save(user);
  }
}
