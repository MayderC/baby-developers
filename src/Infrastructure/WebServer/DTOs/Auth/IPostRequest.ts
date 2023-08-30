import {IPost} from "../../../../Application/Entities/Pojo";

export interface IPostRequest extends IPost{
    userId : string
}