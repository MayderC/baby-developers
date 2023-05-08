import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, ManyToOne } from "typeorm"
import IComments from './../Pojo/IComment';
import {Post, User} from './';

@Entity()
export  class Comment implements IComments {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.comments)
  user: User

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post


  @Column()
  isActive: boolean
}