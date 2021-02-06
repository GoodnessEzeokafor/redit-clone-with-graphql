import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import {MikroORM} from "@mikro-orm/core";
import path from "path"
import { User } from "./entities/User";
console.log("Dirname: ", __dirname)
export default{
    migrations: {
        path: path.join(__dirname, "./migrations"), // path to the folder with migrations
        pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
        disableForeignKeys:true
      },
    entities:[Post, User],
    dbName: 'redit',
    type: 'postgresql',
    debug:!__prod__,
    // clientUrl: 'postgres://hwowjvfs:wO-X7hPex1Y8mneicVO71jK1gjjVBZWT@ziggy.db.elephantsql.com:5432/hwowjvfs', 
}as Parameters<typeof MikroORM.init>[0];


/**
  goody
  password
  redit
 */