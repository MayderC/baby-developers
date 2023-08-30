import { IPost } from "../../Entities/Pojo";
import IPostService from "./../../Ports/Services/IPostService";
import BaseRepository from "./../Repositories/BaseRepository";
import { Post } from "./../../Entities/Models/Post";
import { v4 as uuidv4 } from "uuid";
import IPostRequest from "../../DTOs/IPostRequest";

export default class PostService implements IPostService {
  private _postRepository: BaseRepository<Post>;

  constructor(postRepository: BaseRepository<Post>) {
    this._postRepository = postRepository;
    this._postRepository.setEntity(Post);
  }
  getLastestPosts(): Promise<IPost[]> {
    return this._postRepository.findOptions(null, null, { createdAt: "DESC" });
  }

  async getById(id: string): Promise<Post> {
    return await this._postRepository.get(
      { id },
      {
        user: true,
        company: true,
        tagsPost: true,
        comments: true,
      }
    );
  }

  async getAll(): Promise<Post[]> {
    return await this._postRepository.getAll();
  }

  async delete(id: string): Promise<boolean> {
    await this._postRepository.delete(id);
    // fix this implementation
    return true;
  }

  async update(post: Post, id: string): Promise<boolean> {
    await this._postRepository.update(post, id);
    return true;
  }

  async save(post: IPostRequest): Promise<Post> {
    post.id = uuidv4();
    post.isActive = true;
    return await this._postRepository.save(post);
  }
}
