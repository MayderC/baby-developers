import IUser from '../../Entities/Poco/IUser';

export default interface IUserService {

  getById(id: string): IUser;
  getAll(): Promise<Array<IUser>>;
  delete(id: string): boolean;
  update(user: IUser): boolean;
  save(user: IUser): IUser;

}