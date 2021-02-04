/*
 * @Author: Ducky Yang
 * @Date: 2021-02-04 15:05:37
 * @LastEditTime: 2021-02-04 15:06:57
 * @LastEditors: Ducky Yang
 * @Description: 
 * @FilePath: \express-route-interceptor\test\controller.ts
 */

import { Body, Cookie, Get, Header, Path, Post, Query, RoutePrefix } from "../src/main";

 class UserService {
    constructor(){}
    hello(id:number, name:string){
      return [id, name,"hello world"] ;
    }
  }
  
  @RoutePrefix("/api/users")
  export class UserController {
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
  export class AnimalCtroller{
      // test same name but type not same
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
  