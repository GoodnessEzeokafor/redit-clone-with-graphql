import "reflect-metadata"
import {MikroORM} from "@mikro-orm/core"
import { __prod__ } from "./constants";
// import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config"
import express from "express"
import {ApolloServer} from "apollo-server-express"
import {buildSchema} from "type-graphql"
import { HelloResolver } from "./resolvers/Hello";
import { PostResolver } from "./resolvers/Post";

const main = async() => {
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up()
    const app = express()
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers:[HelloResolver, PostResolver],
            validate:false
        }),
        context: () =>({em:orm.em})
    })
    // app.get("/", (_, res) => {
    //     res.send({msg:"Hello World"})
    // })
    apolloServer.applyMiddleware({app})
    app.listen(4000, () => {
        console.log(`server running on localhost:4000`)
    })


    // const posts = await orm.em.find(Post, {})
    // console.log(`POSTS: ${posts}`)
    // console.log(posts)
    // const post1 = orm.em.create(Post, {title:"my first post", content:"content loading"})
    // const post2 = orm.em.create(Post, {title:"my second post", content:"content loading 2"})
    // await orm.em.persistAndFlush(post1)
    // await orm.em.persistAndFlush(post2)
    
    // // await orm.em.nativeInsert(Post, {title:"my first post 2"})
}

main().catch((err) => {
    console.log(err.message)
})
