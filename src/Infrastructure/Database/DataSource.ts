import { DataSource } from "typeorm";
import {
  Comment,
  User,
  Role,
  Post,
  Company,
  Tags,
} from "../../Application/Entities/Models/";
import { IEnvironment } from "../../Environments/IEnvironment";
import Environments from "../../Environments/index";
import { PostTags } from "../../Application/Entities/Models/PostTags";

const env: IEnvironment = Environments;

export default new DataSource({
  type: env.DB_TYPE,
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: [User, Role, Comment, Post, Company, Tags, PostTags],

  synchronize: true,
});
