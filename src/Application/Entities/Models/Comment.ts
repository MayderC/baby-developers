import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, ManyToOne } from "typeorm"
import IPost from './../Pojo/IPost';
import TagsPost from './TagsPost'
import { Company } from "./Company";
import IComments from './../Pojo/IComment';
import { User } from './User';

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

  @Column()
  isActive: boolean
}