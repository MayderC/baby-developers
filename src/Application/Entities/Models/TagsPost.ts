import { Entity, PrimaryGeneratedColumn, Column, Index, Unique } from "typeorm"
import { ITagsPost } from './../Pojo/ITagsPost';


@Unique(['name'])
@Entity()
export class TagsPost implements ITagsPost {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string;

  @Column()
  isActive: boolean
}