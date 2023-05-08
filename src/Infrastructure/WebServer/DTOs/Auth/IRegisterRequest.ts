import IRole from './../../../../Application/Entities/Pojo/IRole';
export default interface IRegisterRequest {

  fullName: string;
  email: string;
  password: string;
  roles : IRole[];

}