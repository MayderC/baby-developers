
import { Company } from '../Models/Company';
import { ITagsPost } from './ITagsPost';


export default interface IPost {

  id: string;
  title: string;
  body: string;
  tags : ITagsPost[];
  company: Company

}