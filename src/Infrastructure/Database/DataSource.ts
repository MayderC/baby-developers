import { DataSource } from "typeorm"
import {User} from "../../Application/Entities/Models/User"
import {Role} from '../../Application/Entities/Models/Role'

// todo: implement environment vars

export default  new DataSource({
    type: "mssql",
    host: "127.0.0.1",
    port: 1433,
    username: "babydev",
    password: "mayder",
    database: "babydev",
    entities: [User, Role],
    extra: {
      options: {
        encrypt: false,
      },
    },
    synchronize : true
  })

