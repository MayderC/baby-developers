import IComments from './IComment';
export default interface IUser {

  id: string;
  username : string;
  email : string;
  password : string;
 // roles : [];
  comments : IComments[];

}