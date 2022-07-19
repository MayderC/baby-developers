import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, Unique, Index, OneToMany } from "typeorm"
import {Role, Comment, Post} from './'
import IComment from "../Pojo/IComment";
import IUser from './../Pojo/IUser';



@Entity()
export class User implements IUser {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Index({ unique: true })
  @Column({name: 'username'})
  username: string;

  @Index({ unique: true })
  @Column({name: 'email'})
  email: string;

  @Column()
  password: string;

  @Column()
  isActive: boolean

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[]

  @OneToMany(() => Post, (posts) => posts.user)
  posts: Post[]
}