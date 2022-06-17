import IUser from "../../Entities/Poco/IUser";
import IUserRepository from "./../Ports/IUserRepository";

export default class MemoryRepository implements IUserRepository {
  getById(id: string): IUser {
    return {
      id: "string",
      username: "string",
      email: "string",
      password: "string",
    };
  }
  getAll(): IUser[] {
    
    return [
      {
        id: "string",
        username: "string",
        email: "string",
        password: "string",
      },
      {
        id: "string",
        username: "string",
        email: "string",
        password: "string",
      },
      {
        id: "string",
        username: "string",
        email: "string",
        password: "string",
      }
    ]

  }
  delete(id: string): boolean {
    return true
  }
  update(user: IUser): boolean {
    return true
  }
  save(user: IUser): IUser {

    return {
      id: "string",
      username: "string",
      email: "string",
      password: "string",
    };

  }
}
