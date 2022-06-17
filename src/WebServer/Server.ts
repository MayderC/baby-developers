import express from 'express'
import ISetup from '../ISetup';
import dataSource from '../Database/DataSource'
import cors from 'cors'
import userRoutes from '../WebServer/Routes/user.routes';
import UserController from './Controllers/UserController';
import UserService from './../Application/Services/Adapters/UserServices';
import MemoryRepository from './../Application/Repositories/Adapters/MemoryRepository';
import IUserRepository from './../Application/Repositories/Ports/IUserRepository';

export default class Server implements ISetup{

  private app  = express(); 
  PORT = process.env.PORT || 3000;
  PATH : string = '/api/';

  constructor(){
    this.middlewares()
    this.routes()
    this.databaseConexion()
  }
  databaseConexion(){
    dataSource.initialize()
      .then(() => console.log("sql server online"))
      .catch(err => console.log(err))
  }

  middlewares(){
    this.app.use(cors())
  }
  routes(){
    
    this.app.use(this.PATH + 'user', userRoutes(new UserController()))
  }

  start(){
    this.app.listen(this.PORT, () => 
    console.log(`Listen on port: ${this.PORT}`))
  }
}