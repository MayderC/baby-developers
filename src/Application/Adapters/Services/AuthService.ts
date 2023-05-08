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
  requestToResetPassword(email: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async resetPassword(password: string, id: string) {
    const user = await this._userRepository.getById(id);
    const { roles, ...toUpdate } = user;
    toUpdate.password = hashSync(password, genSaltSync(SALT));
    await this._userRepository.update(toUpdate, id);
  }

  async login(login: IUser): Promise<IUser> {
    try {
      const user = await this._userRepository.get({ email: login.email });
      if (!user) throw new Error(`invalid credentials`);
      if (!compareSync(login.password, user.password))
        throw new Error(`invalid credentials`);

      return user;
    } catch (error) {
      throw new Error(`invalid credentials`);
    }
  }

  async register(user: User, role: string): Promise<IUser> {
    user.id = uuidv4();
    user.password = hashSync(user.password, genSaltSync(SALT));
    user.isActive = true;

    try {
      user.roles = [await this._userRoleRepository.get({ name: role })];
    } catch (error) {
      console.log(error, "ROLE");
      throw new Error(`invalid role ${role}`);
    }
    try {
      return await this._userRepository.save(user);
    } catch (error) {
      console.log(error, "SAVE");
      throw new Error(`invalid credentials`);
    }
  }
}
