import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  Unique,
  ManyToMany,
} from "typeorm";
import IRole from "./../Pojo/IRole";
import { User } from "./User";

@Unique(["name"])
@Entity()
export class Role implements IRole {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Index()
  name: string;

  @Column()
  isActive: boolean;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
