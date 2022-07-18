import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, Unique, Index, OneToMany } from "typeorm"
import IComment from "../Pojo/IComment";
import IUser from './../Pojo/IUser';
import {Role} from './Role'
import { Comment } from './Comment';


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
  comments: IComment[];
}