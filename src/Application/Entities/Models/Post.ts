import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { Company, User, Tags, Comment } from "./";
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

  @Column()
  userId: string;

  @OneToMany(() => PostTags, (postTags) => postTags.posts)
  tagsPost?: PostTags[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments?: Comment[];

  @ManyToOne(() => User, (user) => user.posts)
  user?: User;

  @ManyToOne(() => Company, (company) => company.posts)
  company?: Company;

  @Column()
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
