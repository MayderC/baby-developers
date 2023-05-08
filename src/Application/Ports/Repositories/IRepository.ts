import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export default interface IRepository<T>{

  getById(id: string): Promise<T | null>;
  getAll(): Promise<Array<T>>;
  delete(id: string): Promise<boolean>;

  //update, entity:  QueryDeepPartialEntity<T>
  update(entity: unknown, id: string): Promise<boolean>;
  save(entity: T): Promise<T>;
  // todo improve this method
  get(options: unknown, relations: unknown): Promise<T | null>;

}