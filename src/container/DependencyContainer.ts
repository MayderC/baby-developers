import {asClass, createContainer, InjectionMode} from 'awilix'
import AuthController from '../Infrastructure/WebServer/Controllers/AuthController';
import UserController from '../Infrastructure/WebServer/Controllers/UserController';
import UserService from '../Application/Adapters/Services/UserServices';
import AuthService from '../Application/Adapters/Services/AuthService';
import UserRepository from '../Application/Adapters/Repositories/UserRepository';


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
