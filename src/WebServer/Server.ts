const cors = require('cors')
const express =  require('express')
import ISetup from '../ISetup';
import dataSource from '../Database/DataSource'
import userRoutes from '../WebServer/Routes/user.routes';
import authRoutes from '../WebServer/Routes/auth.routes'
import DependencyContainer from '../container/DependencyContainer';


export default class Server implements ISetup{

  private _dependencyContainer: DependencyContainer;
  private app  = express(); 
  PORT = process.env.PORT || 3000;
  PATH : string = '/api/';

  private _usercotroller = 'UserController'

  constructor(){
    this._dependencyContainer = new DependencyContainer()
    this.middlewares()
    this.databaseConexion()
  }
  
  databaseConexion(){
    dataSource.initialize()
      .then(() => console.log("sql server online"))
      .catch(err => console.log(err))
  }

  middlewares(){
    this.app.use(cors())
    this.app.use(express.json())
  }
  routes(){
    this.app.use(this.PATH + 'auth', authRoutes(this._dependencyContainer.getContainer.resolve(this._usercotroller)))
    this.app.use(this.PATH + 'user', userRoutes(this._dependencyContainer.getContainer.resolve(this._usercotroller)))
  }

  start(){
    this.app.listen(this.PORT, () =>{
    this.routes()
    console.log(`Listen on port: ${this.PORT}`)})
  }
}