import { Request, Response } from "express";
import { IPost } from "../../../Application/Entities/Pojo";
import IPostService from "../../../Application/Ports/Services/IPostService";
import { BAD, OK } from "../http-status";
import { NOT_FOUND } from "../http-status";
import { CustomResquestHandler } from "../Middlewares/CustomResquestHandler";
import { IPostRequest } from "../DTOs/Auth/IPostRequest";
export default class PostController {
  private _postService: IPostService;

  constructor(postService: IPostService) {
    this._postService = postService;
  }

  async getById(req: Request, res: Response): Promise<Response<IPost>> {
    try {
      const post: IPost = await this._postService.getById(req.params.id);
      if (!post) return res.status(NOT_FOUND).send();
      return res.status(OK).send(post);
    } catch (error) {
      return res.status(NOT_FOUND).send(error);
    }
  }

  async getAll(req: Request, res: Response): Promise<Response<Array<IPost>>> {
    try {
      const posts: Array<IPost> = await this._postService.getAll();
      return res.status(OK).send(posts);
    } catch (error) {
      return res.status(BAD).send(error);
    }
  }

  async getLasPosts(
    req: Request,
    res: Response
  ): Promise<Response<Array<IPost>>> {
    try {
      const posts: Array<IPost> = await this._postService.getLastestPosts();
      return res.status(OK).send(posts);
    } catch (error) {}
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      await this._postService.delete(req.params.id);
      return res.status(OK).send();
    } catch (error) {
      return res.status(BAD).send();
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { tags, ...postToUpdate } = req.body.post;
      await this._postService.update(postToUpdate, req.params.id);
      return res.status(OK).send();
    } catch (error) {
      console.log(error);
      return res.status(BAD).send();
    }
  }

  async filterPostsByOptions(
    req: Request,
    res: Response
  ): Promise<Response<Array<IPost>>> {
    try {
      const posts: Array<IPost> = await this._postService.filterPostsByOptions(
        req.body
      );
      return res.status(OK).send(posts);
    } catch (error) {}
  }

  async save(
    req: CustomResquestHandler,
    res: Response
  ): Promise<Response<IPost>> {
    try {
      const postRequest: IPostRequest = req.body.post;
      postRequest.userId = req.userLogged.id;
      const post = await this._postService.save(postRequest);
      return res.status(OK).send(post);
    } catch (error) {
      console.log(error);
      return res.status(BAD).send();
    }
  }
}
