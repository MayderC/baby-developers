import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, Unique, Index, OneToMany } from "typeorm"
import {Role, Comment, Post} from './'
import IUser from './../Pojo/IUser';
import IRole from './../Pojo/IRole';



@Entity()
export class User implements IUser {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({name: 'fullName'})
  fullName: string;

  @Index({ unique: true })
  @Column({name: 'email'})
  email: string;

  @Column()
  password: string;

  @Column()
  isActive: boolean

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Promise<IRole[]> | IRole[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[]

  @OneToMany(() => Post, (posts) => posts.user)
  posts: Post[]
}