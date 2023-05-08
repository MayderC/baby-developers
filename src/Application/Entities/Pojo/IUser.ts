import IRole from './IRole';
export default interface IUser {

  id: string;
  fullName : string;
  email : string;
  password : string;
  roles : Promise<IRole[]> | IRole[]

}