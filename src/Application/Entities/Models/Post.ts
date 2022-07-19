import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, ManyToOne } from "typeorm"
import { Company, User, TagsPost } from "./";
import {IPost} from './../Pojo/';


@Entity()
export class Post implements IPost {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  description: string;

  @ManyToOne(() => Company, (company) => company.posts)
  company: Company

  @ManyToMany(() => TagsPost)
  @JoinTable()
  tags: TagsPost[];

  @ManyToOne(() => User, (user) => user.posts )
  user : User

  @Column()
  isActive: boolean
}