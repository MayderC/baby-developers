import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import {Company, User, Tags, Comment} from "./";
import { IPost } from "./../Pojo/";
import { PostTags } from "./PostTags";

@Entity()
export class Post implements IPost {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  description: string;

  @OneToMany(() => PostTags, (postTags) => postTags.tags)
  tagsPost: PostTags[];

  @OneToMany(()=>Comment, (comment) =>comment.id)
  comments : Comment[]

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @ManyToOne(() => Company, (company) => company.posts)
  company: Post[];

  @Column()
  isActive: boolean;
}
