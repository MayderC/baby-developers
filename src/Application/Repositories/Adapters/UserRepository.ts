import IRepository from './../Ports/IRepository';
import IUser from './../../Entities/Pojo/IUser';
import IRepositoryGetByUsername from './../Ports/IRepositoryGetByUsername';
import AppDataSource from '../../../Database/DataSource'
import User  from '../../Entities/Models/User'
import { FindOptionsWhere } from 'typeorm';

export default class UserRepository implements IRepository<IUser>, IRepositoryGetByUsername<IUser> {

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
    
    await AppDataSource.manager.delete(User, {where : {id: id}})
    return true
  }

  async update(user: IUser): Promise<boolean> {
   
    await AppDataSource.manager.update(User, {where : {id: user.id}}, user)
    return true
  }

  async save(user: IUser): Promise<IUser> {

    return await AppDataSource.manager.create(User, user)
  }

  async getByUsername(username: string): Promise<IUser | null> {

    return await AppDataSource.manager.findOne(User, {where : { username: username}})
  }

}