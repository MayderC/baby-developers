import { Entity, PrimaryGeneratedColumn, Column, Index, Unique, OneToMany } from "typeorm"
import ICompany from './../Pojo/ICompany';
import { Post } from "./Post";


@Unique(['name'])
@Entity()
export class Company implements ICompany {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @Index()
  name: string;

  @Column()
  website: string;

  @Column()
  description: string;

  @Column()
  logo: string;

 // @OneToMany(() => Post, (posts) => posts.company)
  //posts: Post[]

  @Column()
  isActive: boolean


}