import { IEnvironment } from "./IEnvironment";

const Production : IEnvironment = {
  PORT: 0,
  STRING_CONEXION: "",
  JWT_KEYWORD: "",
  NODE_ENV: ""
}

const Development : IEnvironment = {
  PORT: 0,
  STRING_CONEXION: "",
  JWT_KEYWORD: "",
  NODE_ENV: ""
}

const Qa : IEnvironment = {
  PORT: 0,
  STRING_CONEXION: "",
  JWT_KEYWORD: "",
  NODE_ENV: ""
}


module.exports = {
  Production,
  Development,
  Qa
}