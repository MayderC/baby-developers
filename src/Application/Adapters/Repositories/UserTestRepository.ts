
import IUserRepository from '../../Ports/Repositories/IUserRepository';
import IUser from '../../Entities/Pojo/IUser';

export default class TestRepository implements IUserRepository<IUser>{

  getByUsername(id: string): Promise<IUser> {
    
    return Promise.resolve({email: "email@example.com", id:"id", password: "hash", username: "username"})

  }
  getById(id: string): Promise<IUser> {
    
    return Promise.resolve({email: "email@example.com", id:"id", password: "hash", username: "username"})
  }
  getAll(): Promise<IUser[]> {
    
    return Promise.resolve([
      {email: "email@example.com", id:"id", password: "hash", username: "username"},
      {email: "email@example.com", id:"id", password: "hash", username: "username"},
      {email: "email@example.com", id:"id", password: "hash", username: "username"},
      {email: "email@example.com", id:"id", password: "hash", username: "username"},
      {email: "email@example.com", id:"id", password: "hash", username: "username"}
    ])

  }
  delete(id: string): Promise<boolean> {

    return Promise.resolve([true, false][Math.floor(Math.random())])

  }
  update(user: IUser): Promise<boolean> {
    return Promise.resolve([true, false][Math.floor(Math.random())])

  }
  save(user: IUser): Promise<IUser> {
    return Promise.resolve({email: "email@example.com", id:"id", password: "hash", username: "username"})
  }
  get(options: unknown): Promise<IUser> {
    return Promise.resolve({email: "email@example.com", id:"id", password: "hash", username: "username"})
  }
  
}