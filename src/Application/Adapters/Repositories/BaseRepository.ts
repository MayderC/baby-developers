import IRepository from "../../Ports/Repositories/IRepository";
import AppDataSource from "../../../Infrastructure/Database/DataSource";
import {
  EntityTarget,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
} from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { ERROR } from "../../../Infrastructure/WebServer/http-status";

export default class BaseRepository<T> implements IRepository<T> {
  private _entity;

  constructor() {}

  setEntity(entity: EntityTarget<T>) {
    this._entity = entity;
  }

  async getById(id: string): Promise<typeof this._entity | null> {
    return await AppDataSource.manager.findOne(this._entity, {
      where: { id: id },
    });
  }

  async getAll(): Promise<Array<T>> {
    return await AppDataSource.manager.find<T>(this._entity);
  }

  async delete(id: string): Promise<boolean> {
    const data = await AppDataSource.manager
      .createQueryBuilder()
      .delete()
      .from(this._entity)
      .where("id = :id", { id: id })
      .execute();

    return !!data.affected;
  }
  async update(
    entity: QueryDeepPartialEntity<T>,
    id: string
  ): Promise<boolean> {
    await AppDataSource.manager.update<T>(this._entity, { id: id }, entity);
    return true;
  }

  async save(entity: T): Promise<T> {
    console.log(entity);
    await AppDataSource.manager.insert(this._entity, entity);
    return entity;
  }

  async findOptions(
    options: FindOptionsWhere<T> = {},
    relations: FindOptionsRelations<T> = {},
    order: FindOptionsOrder<T> = {}
  ): Promise<T[] | null> {
    const response = await AppDataSource.manager.find(this._entity, {
      where: options,
      relations,
      order,
    });
    if (!response) throw new Error("not fount");
    return response;
  }

  async get(
    options: FindOptionsWhere<T>,
    relations: FindOptionsRelations<T> = {}
  ): Promise<T | null> {
    const response = await AppDataSource.manager.findOne(this._entity, {
      where: options,
      relations,
    });
    if (!response) throw new Error("not fount");
    return response;
  }
}
