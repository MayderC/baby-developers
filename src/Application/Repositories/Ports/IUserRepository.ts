import IUser from './../../Entities/Poco/IUser';

export default interface IUserRepository{

  getById(id: string): IUser;
  getAll(): Array<IUser>;
  delete(id: string): boolean;
  update(user: IUser): boolean;
  save(user: IUser): IUser;

}