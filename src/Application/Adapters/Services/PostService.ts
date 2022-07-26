import { IPost } from '../../Entities/Pojo';
import IPostService from './../../Ports/Services/IPostService';
import BaseRepository from './../Repositories/BaseRepository';
import { Post } from './../../Entities/Models/Post';


export default class PostService implements IPostService {

  private _postRepository: BaseRepository<Post> ;

  constructor(postRepository: BaseRepository<Post>){

    this._postRepository = postRepository;
    this._postRepository.setEntity(Post)

  }

  async getById(id: string): Promise<IPost> {
    return await this._postRepository.getById(id);
  }

  async getAll(): Promise<Post[]> {
    return await this._postRepository.getAll()
  }

  async delete(id: string): Promise<boolean> {
    await this._postRepository.delete(id)
    // fix this implementation
    return true
  }

  async update(post: Post, id: string): Promise<boolean> {
   await  this._postRepository.update(post, id)
   return true
  }
  
  async save(post: Post): Promise<IPost> {
   return await this._postRepository.save(post) 
  }
}