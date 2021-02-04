/*
 * @Author: Ducky Yang
 * @Date: 2021-02-03 20:24:38
 * @LastEditTime: 2021-02-04 11:37:33
 * @LastEditors: Ducky Yang
 * @Description:
 * @FilePath: \express-route-interceptor\test\app.ts
 * @
 */

import express from "express";
import {
  RoutePrefix,
  Get,
  Path,
  Body,
  Post,
  Query,
  Cookie,
  Header,
} from "../src/main";
import interceptor from "../src/route-interceptor";

const app = express();

class UserService {
  constructor(){}
  hello(id:number, name:string){
    return [id, name,"hello world"] ;
  }
}

@RoutePrefix("/api/users")
class UserController {
  userService: UserService;
  constructor(){
    this.userService = new UserService();
  }
  @Get("/:id")
  async get(
    @Path("id","number") id: number,
    @Query("") data: string
  ) {
    return this.userService.hello(id, data);
  }
  @Post("")
  async post(@Query("id","number")id:number, @Body("id") user: IUserModel) {
   console.log(id);
   console.log(user);
    return user;
  }
}
@RoutePrefix("/api/animals")
class AnimalCtroller{
   @Get("/:id")
   eat(@Path("id")id:string, @Query("food")food: string, @Cookie("token")token: string, @Header("token")token1:string){
     console.log(token);
     console.log(token1);
    return `${id} animal eat ${food}`;
   }
}

interface IUserModel {
  name: string;
  id: number;
}


interceptor.bind(app, "json");

app.listen(8080, "localhost", () => {});
