import IUser from '../../Entities/Pojo/IUser';
import AppDataSource from '../../../Infrastructure/Database/DataSource'
import {User} from '../../Entities/Models/User';
import { FindOptionsWhere } from 'typeorm';
import IRepository from './../../Ports/Repositories/IRepository';



export default class UserRepository implements IRepository<IUser> {


 async get(options: FindOptionsWhere<IUser>): Promise<IUser | null> {
    return await AppDataSource.manager.findOne(User, {where: options, relations : {roles : true} })    
  }

  async getById(id: string): Promise<IUser | null> {
    return await AppDataSource.manager.findOne(User, {where : {id: id}, relations: {roles: true}});
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

  async save(user: User): Promise<User> {
    await AppDataSource.manager.save(User, user)
    return user
  }
}