import IBaseService from "./IBaseService";
import IPost from "./../../Entities/Pojo/IPost";

export default interface IPostService extends IBaseService<IPost> {
  getLastestPosts(): Promise<Array<IPost>>;
  filterPostsByOptions(options: any): Promise<Array<IPost>>;
}
