import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, Unique, Index } from "typeorm"
import IUser from './../Pojo/IUser';
import {Role} from './Role'


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
}