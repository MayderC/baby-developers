const cors = require('cors')
const express =  require('express')
import ISetup from '../../ISetup';
import dataSource from '../Database/DataSource'


export default class Server implements ISetup{

  private app  = express(); 
  private userRoutes;
  private authRoutes;
  private postRoutes;

  PORT = process.env.PORT || 5000;
  PATH : string = '/api/';

  constructor(userRoutes, authRoutes, postRoutes){
    this.userRoutes = userRoutes
    this.authRoutes = authRoutes
    this.postRoutes = postRoutes
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
    this.app.use(this.PATH + 'post', this.postRoutes)
  }

  start(){
    this.app.listen(this.PORT, () =>{
      console.log(`Listen on port: ${this.PORT}`)
    })
  }
}