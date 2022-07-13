import IUser from '../../Entities/Pojo/IUser';

export default interface IUserService {

  getById(id: string): Promise<IUser | null>;
  getAll(): Promise<Array<IUser>>;
  delete(id: string): Promise<boolean>;
  update(user: IUser): boolean;
  save(user: IUser): Promise<IUser>;
  getByUsernme(username: string): Promise<IUser>;
}