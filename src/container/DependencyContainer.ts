import {asClass, asFunction, createContainer, InjectionMode} from 'awilix'
import AuthController from '../Infrastructure/WebServer/Controllers/AuthController';
import UserController from '../Infrastructure/WebServer/Controllers/UserController';
import UserService from '../Application/Adapters/Services/UserServices';
import AuthService from '../Application/Adapters/Services/AuthService';
import Server from './../Infrastructure/WebServer/Server';
import userRoutes from '../Infrastructure/WebServer/Routes/user.routes';
import authRoutes from '../Infrastructure/WebServer/Routes/auth.routes';
import UserRepository from '../Application/Adapters/Repositories/UserRepository';



export default class DependencyContainer {

  private _container;

  constructor(){
    this._container = createContainer({
      injectionMode : InjectionMode.CLASSIC
    })
    this.registerServer()
    this.registerRoutes()
    this.registerCotrollers();
    this.registerServices();
    this.registerRepositories();
  }

  get getContainer () { 
    return this._container
  }

  registerServer(){
    this._container.register({
      Server :asClass(Server).singleton(),
    })
  }

  registerRoutes(){
    this._container.register({
      userRoutes: asFunction(userRoutes),
      authRoutes: asFunction(authRoutes)
    })
  }

  registerCotrollers(){
    this._container.register({
      authController : asClass(AuthController).scoped(),
      userController : asClass(UserController).scoped()
    })
  }

  registerServices(){
    this._container.register({
      userService : asClass(UserService).scoped(),
      authService : asClass(AuthService).scoped()
    })   
  }
  
  registerRepositories(){
    this._container.register({
      userRepository : asClass(UserRepository).scoped()
    })
  }

}
