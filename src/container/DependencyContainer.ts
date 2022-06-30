import {asClass, createContainer, InjectionMode} from 'awilix'
import AuthController from './../WebServer/Controllers/AuthController';
import UserController from './../WebServer/Controllers/UserController';
import UserService from './../Application/Services/Adapters/UserServices';
import AuthService from '../Application/Services/Adapters/AuthService';
import UserRepository from './../Application/Repositories/Adapters/UserRepository';


export default class DependencyContainer {

  private _container;

  constructor(){
    this._container = createContainer({
      injectionMode : InjectionMode.CLASSIC
    })
    
    this.registerCotrollers();
    this.registerRepositories();
    this.registerServices();
  }

  get getContainer () { 
    return this._container
  }

  registerCotrollers(){
    this._container.register({

      AuthController : asClass(AuthController).scoped(),
      UserController : asClass(UserController).scoped()

    })
  }

  registerServices(){
    this._container.register({

      UserService : asClass(UserService).scoped(),
      AuthService : asClass(AuthService).scoped()

    })   
  }
  
  registerRepositories(){
    this._container.register({

      UserRepository : asClass(UserRepository).scoped()

    })
  }

}
