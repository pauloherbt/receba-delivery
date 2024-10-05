import knex from "knex";
import { env } from "../config";
import * as configs from "./knexfile";
let environment = configs.development;
if(env.NODE_ENV==="test"){
    environment = configs.test;
}
const qb = knex(environment);

export default qb;