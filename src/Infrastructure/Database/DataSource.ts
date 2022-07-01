import { DataSource } from "typeorm"

// todo: implement environment vars

export default  new DataSource({
    type: "mssql",
    host: "127.0.0.1",
    port: 1433,
    username: "babydev",
    password: "mayder",
    database: "babydev",
    entities: [],
    extra: {
      options: {
        encrypt: false
      },
    },
})
