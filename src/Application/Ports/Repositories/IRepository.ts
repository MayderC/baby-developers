export default interface IRepository<T>{

  getById(id: string): Promise<T | null>;
  getAll(): Promise<Array<T>>;
  delete(id: string): Promise<boolean>;
  update(user: T): Promise<boolean>;
  save(user: T): Promise<T>;
  // todo improve this method
  get(options: unknown): Promise<T | null>;
  
}