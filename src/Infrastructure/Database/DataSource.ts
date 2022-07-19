import { DataSource } from "typeorm"
import {Comment, User, Role, Post, Company, TagsPost} from '../../Application/Entities/Models/'


// todo: implement environment vars

export default  new DataSource({
    type: "mssql",
    host: "127.0.0.1",
    port: 1433,
    username: "babydev",
    password: "mayder",
    database: "babydev",
    entities: [User, Role, Comment, Post, Company, TagsPost],
    extra: {
      options: {
        encrypt: false,
      },
    },
    synchronize : true
  })

