import IRepository from "./IRepository";

export default interface IUserRepository<T> extends IRepository<T> {
  getByUsername(id: string): Promise<T | null>;
}