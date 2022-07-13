import ISetup from './ISetup';
import  DependencyContainer from './container/DependencyContainer';



const dependencyContainer = new DependencyContainer()
const server : ISetup = dependencyContainer.getContainer.resolve('Server')
server.start()