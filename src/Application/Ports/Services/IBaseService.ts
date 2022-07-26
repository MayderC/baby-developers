

export default interface IBaseService<T> {

  getById(id: string): Promise<T | null>;
  getAll(): Promise<Array<T>>;
  delete(id: string): Promise<boolean>;
  update(entity: T, id: string): Promise<boolean>;
  save(user: T): Promise<T>;

}

