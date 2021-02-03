/*
 * @Author: Ducky Yang
 * @Date: 2021-02-03 20:24:38
 * @LastEditTime: 2021-02-03 22:11:14
 * @LastEditors: Ducky Yang
 * @Description:
 * @FilePath: /express-route-interceptor/test/app.ts
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
} from "../src/main";
import interceptor from "../src/route-interceptor";

const app = express();

@RoutePrefix("/api/users")
class UserService {
  @Get("/:id")
  async get(
    @Path("id") id: number,
    @Query("name") name: string
  ) {
    return id;
  }
  @Post("")
  async post(@Body("user") user: IUserModel) {
    const ts = this;
    return user.id + user.name;
  }
}

interface IUserModel {
  name: string;
  id: number;
}

interceptor.bind(app);

app.listen(8080, "localhost", () => {});
