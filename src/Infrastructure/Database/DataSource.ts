import { DataSource } from "typeorm"
import {Comment, User, Role} from '../../Application/Entities/Models/'

// todo: implement environment vars

export default  new DataSource({
    type: "mssql",
    host: "127.0.0.1",
    port: 1433,
    username: "babydev",
    password: "mayder",
    database: "babydev",
    entities: [User, Role, Comment],
    extra: {
      options: {
        encrypt: false,
      },
    },
    synchronize : true
  })

