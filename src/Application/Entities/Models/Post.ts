import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, ManyToOne } from "typeorm"
import IPost from './../Pojo/IPost';
import TagsPost from './TagsPost'
import { Company } from "./Company";

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

  @Column()
  isActive: boolean
}