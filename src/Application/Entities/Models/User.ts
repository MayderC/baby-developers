import { EntitySchema } from "typeorm";
import IUser from "../Pojo/IUser";

export default new EntitySchema<IUser>({
  name: "user",
  columns: {
      id: {
          type: String,
          primary: true,
          generated: true,
      },
      username : {
        type : String
      },
      email : {
        type: String
      },
      password : {
        type : String
      }
  }
})