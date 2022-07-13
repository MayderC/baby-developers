import { Entity, PrimaryGeneratedColumn, Column, Index, Unique } from "typeorm"
import IRole from './../Pojo/IRole';


@Unique(['name'])
@Entity()
export class Role implements IRole {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @Index()
  name: string;

  @Column()
  isActive: boolean


}