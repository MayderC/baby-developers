const cors = require('cors')
const express =  require('express')
import ISetup from '../../ISetup';
import dataSource from '../Database/DataSource'

export default class Server implements ISetup{


  private app  = express(); 
  PORT = process.env.PORT || 5000;
  PATH : string = '/api/';

  private userRoutes;
  private authRoutes;

  constructor(userRoutes, authRoutes){
    this.userRoutes = userRoutes
    this.authRoutes = authRoutes
    this.middlewares()
    this.routes()
    this.databaseConexion()
  }

  databaseConexion(){
    dataSource.initialize()
      .then(() => console.log("conected to db"))
      .catch(err => console.log(err))
  }

  middlewares(){
    this.app.use(cors())
    this.app.use(express.json())
  }
  
  routes(){

    this.app.use(this.PATH + 'auth', this.authRoutes)
    this.app.use(this.PATH + 'user', this.userRoutes)
  }

  start(){
    this.app.listen(this.PORT, () =>{
      console.log(`Listen on port: ${this.PORT}`)
    })
  }
}