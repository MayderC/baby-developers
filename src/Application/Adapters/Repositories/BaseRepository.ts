import IRepository from "../../Ports/Repositories/IRepository";
import AppDataSource from '../../../Infrastructure/Database/DataSource'
import { EntityTarget, FindOptionsWhere } from "typeorm";



export default class BaseRepository<T> implements IRepository<T> {
 
  private _entity;

  constructor(){
    
  }

  setEntity(entity : EntityTarget<T>){
    this._entity  = entity
  }
  
  async getById(id: string): Promise<typeof this._entity | null> {
    return await AppDataSource.manager.findOne(this._entity, {where : {id: id}});
  }

  async getAll(): Promise<Array<T>> {
    return await AppDataSource.manager.find<T>(this._entity)
  }

  async delete(id: string): Promise<boolean> {
    const data =  await AppDataSource.manager
    .createQueryBuilder()
    .delete()
    .from(this._entity)
    .where("id = :id", {id : id})
    .execute()

    return !!data.affected
  }
  async update(entity: T, id: string): Promise<boolean> {
    await AppDataSource.manager.update(this._entity, {where : {id: id}}, entity)
    return true
  }

  async save(entity: T): Promise<T> {
    await AppDataSource.manager.insert(this._entity, entity)
    return entity
  }

  async get(options: FindOptionsWhere<T>): Promise<T> {
    return await AppDataSource.manager.findOne(this._entity, {where: options })  
  }
  
}