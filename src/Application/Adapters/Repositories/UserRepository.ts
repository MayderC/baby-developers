import IUser from '../../Entities/Pojo/IUser';
import AppDataSource from '../../../Infrastructure/Database/DataSource'
import {User} from '../../Entities/Models/User';
import { FindOptionsWhere } from 'typeorm';
import IUserRepository from '../../Ports/Repositories/IUserRepository';



export default class UserRepository implements IUserRepository<IUser> {

 async get(options: FindOptionsWhere<IUser>): Promise<IUser | null> {
    return await AppDataSource.manager.findOne(User, {where: options })    
  }

  async getById(id: string): Promise<IUser | null> {
    return await AppDataSource.manager.findOne(User, {where : {id: id}});
  }

  async getAll(): Promise<Array<IUser>> {
    return await AppDataSource.manager.find<IUser>(User)
  }

  async delete(id: string): Promise<boolean> {
    
   const data =  await AppDataSource.manager
    .createQueryBuilder()
    .delete()
    .from(User)
    .where("id = :id", {id : id})
    .execute()

    return !!data.affected
  }

  async update(user: IUser): Promise<boolean> {
   
    await AppDataSource.manager.update(User, {where : {id: user.id}}, user)
    return true
  }

  async save(user: IUser): Promise<IUser> {
    await AppDataSource.manager.insert(User, user)
    return user
  }

  async getByUsername(username: string): Promise<IUser | null> {
    return await AppDataSource.manager.findOne(User, {where : { username: username}})
  }

}