import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ITagsPost } from "../Pojo/ITagsPost";
import { PostTags } from "./PostTags";

@Entity()
export class Tags implements ITagsPost {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany(() => PostTags, (post) => post.posts)
  tagsPost: PostTags[];

  @Column()
  isActive: boolean;
}
