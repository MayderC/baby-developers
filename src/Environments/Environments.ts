import { IEnvironment } from "./IEnvironment";

const Production : IEnvironment = {
  PORT: 0,
  JWT_KEYWORD: "",
  NODE_ENV: "",
  DB_TYPE: "",
  DB_USERNAME: "",
  DB_PASSWORD: "",
  DB_NAME: "",
  DB_PORT: 0,
  DB_HOST: ""
}

const Development : IEnvironment = {
  PORT: Number(process.env.PORT),
  JWT_KEYWORD: process.env.JWT_KEYWORD,
  NODE_ENV: process.env.NODE_ENV,
  DB_TYPE: process.env.DB_TYPE,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: Number(process.env.DB_PORT),
  DB_HOST: process.env.DB_HOST
}

const Qa : IEnvironment = {
  PORT: 0,
  JWT_KEYWORD: "",
  NODE_ENV: "",
  DB_TYPE: "",
  DB_USERNAME: "",
  DB_PASSWORD: "",
  DB_NAME: "",
  DB_PORT: 0,
  DB_HOST: ""
}


module.exports = {
  Production,
  Development,
  Qa
}