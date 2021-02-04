/*
 * @Author: Ducky Yang
 * @Date: 2021-02-03 20:24:38
 * @LastEditTime: 2021-02-04 15:09:15
 * @LastEditors: Ducky Yang
 * @Description:
 * @FilePath: \express-route-interceptor\test\app.ts
 * @
 */

import express from "express";
import interceptor from "../src/route-interceptor";
import {UserController, AnimalCtroller} from "./controller";

const app = express();

interceptor.bind(app, "json",[
  UserController,
  AnimalCtroller
]);

app.listen(8080, "localhost", () => {});
