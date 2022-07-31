import { DataSource } from "typeorm"
import {Comment, User, Role, Post, Company, TagsPost} from '../../Application/Entities/Models/'
import { IEnvironment } from "../../Environments/IEnvironment"
import Environments from "../../Environments/index"

const env: IEnvironment = Environments

export default  new DataSource({
    type: env.DB_TYPE,
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    entities: [User, Role, Comment, Post, Company, TagsPost],
    extra: {
      options: {
        encrypt: false,
      },
    },
    synchronize : true
  })

