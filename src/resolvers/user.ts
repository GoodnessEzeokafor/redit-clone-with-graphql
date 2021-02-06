import { User } from "../entities/User";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from "type-graphql";
import argon2 from "argon2"


@InputType()
class UsernamePasswordEmailInput{
    
    @Field()
    username:string

    @Field()
    email:string

    @Field()
    password:string
}
@ObjectType()
class FieldError{
    @Field()
    field:string;
    
    @Field()
    message:string;
}

@ObjectType()
class UserResponse{
    @Field(() => [FieldError], {nullable:true})
    errors?:FieldError[]

    @Field(() => User, {nullable:true})
    user?:User
}

@Resolver()
export class UserResolver{
    @Mutation(() => User)
    async register(
        @Arg("options") options:UsernamePasswordEmailInput,
        @Ctx() {em}:MyContext
    ){
        const hashedPassword = await argon2.hash(options.password)
        const user = em.create(User, {
                username:options.username, 
                email:options.email,
                password:hashedPassword
            })
        await em.persistAndFlush(user)
        return user;
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg("options") options:UsernamePasswordEmailInput,
        @Ctx() {em}:MyContext
    ): Promise<UserResponse>{
        const user = await em.findOneOrFail(User, {email:options.email})
        if(!user){
            return{
                errors:[
                    {
                    field:"username",
                    message:"that email dosen't exist"
                }
            ]
            }
        }

        return user;

    }

}

// 1:29:12 minutes