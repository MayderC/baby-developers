import { IEnvironment } from "./IEnvironment"


if(process.env.NODE_ENV == undefined)
  require('dotenv').config()

interface IEnvironmentContainer {
  Qa: IEnvironment;
  Development : IEnvironment;
  Production: IEnvironment;
}
const environments : IEnvironmentContainer = {
  Qa: require('./Environments').Qa,
  Development : require('./Environments').Development,
  Production: require('./Environments').Production
}

const getEnvironment = (env: string | undefined) : IEnvironment => 
  env in environments ? environments[env] : environments['Development']

export default getEnvironment(process.env.NODE_ENV);