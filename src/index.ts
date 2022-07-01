
import Server from './Infrastructure/WebServer/Server';
import ISetup from './ISetup';

const server : ISetup = new Server()

server.start()