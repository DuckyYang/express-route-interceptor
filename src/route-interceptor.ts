/*
 * @Author: Ducky Yang
 * @Date: 2021-02-03 15:05:35
 * @LastEditTime: 2021-02-04 10:29:49
 * @LastEditors: Ducky Yang
 * @Description:
 * @FilePath: \express-route-interceptor\src\route-interceptor.ts
 */

import {
  RouteMeta,
  HttpMethod,
  RouteMethodMeta,
  RouteParamMeta,
} from "./route-meta";
import * as core from "express-serve-static-core";
import express, { Request, Response, NextFunction } from "express";

export type ExpressParser = "json" | "urlencoded";

/**
 * express route interceptor
 */
class RouteInterceptor {
  Parser: ExpressParser = "json";
  /**
   * route mappings
   */
  RouteMappings: RouteMeta[] = [];
  /**
   * add a route meta
   * @param meta route meta
   */
  addMeta(meta: RouteMeta) {
    this.RouteMappings.push(meta);
  }
  /**
   * get a route meta by name
   * @param name route meta name
   */
  getMeta(name: string) {
    let meta = this.RouteMappings.filter((x) => x.name === name)[0];
    if (!meta) {
      meta = new RouteMeta();
      meta.name = name;

      this.RouteMappings.push(meta);
    }
    return meta;
  }
  /**
   * get method meta of route
   * @param meta route meta
   * @param methodName method name
   */
  getMethodMeta(meta: RouteMeta, methodName: string) {
    let methodMeta = meta.routes.filter((x) => x.name === methodName)[0];
    if (!methodMeta) {
      methodMeta = new RouteMethodMeta();
      methodMeta.name = methodName;

      meta.routes.push(methodMeta);
    }
    return methodMeta;
  }
  /**
   * get param meta of method
   * @param methodMeta
   * @param paramName
   */
  getParamMeta(methodMeta: RouteMethodMeta, paramName: string) {
    let paramMeta = methodMeta.params.filter((x) => x.name === paramName)[0];
    if (!paramMeta) {
      paramMeta = new RouteParamMeta();
      paramMeta.name = paramName;

      methodMeta.params.push(paramMeta);
    }
    return paramMeta;
  }
  /**
   * bind routes to app
   * @param app express instance
   */
  bind(app: core.Express, parser: ExpressParser) {
    /**
     * use body parser
     */
    if (parser === "urlencoded") {
      this.Parser = "urlencoded";
      app.use(express.urlencoded());
    } else {
      this.Parser = "json";
      app.use(express.json());
    }

    //
    this.RouteMappings.forEach((routeMeta) => {
      const router = express.Router();
      //
      routeMeta.routes.forEach((methodMeta) => {
        const { method, executor, template, params } = methodMeta;

        // common middleware for every request
        const middleware = (
          req: Request,
          res: Response,
          next: NextFunction
        ) => {
          //
          let ps: any[] = [];
          //
          params
            .sort((x) => x.index)
            .forEach((p) => {
              ps.push(this.prepareVal(req, p));
            });
          // call executor
          let result = executor.call(routeMeta.instance, ...ps.reverse());
          // if executor returns promise
          if (result instanceof Promise) {
            result
              .then((value) => {
                !res.headersSent && res.json(value);
              })
              .catch((err) => {
                next(err);
              });
          } else if (result) {
            !res.headersSent && res.json(result);
          }
        };
        router[<HttpMethod>method](template, middleware);
      });

      app.use(routeMeta.prefix, router);
    });
  }
  private prepareVal(req: Request, paramMeta: RouteParamMeta) {
    /**
     * To-do: type cast for number or boolean
     */
    let val;
    switch (paramMeta.from) {
      case "path":
        val = req.params[paramMeta.name];
        break;
      case "body":
        // if param's name is not empty, try to get. Otherwise do nothing.
        if (paramMeta.name) {
            val = req.body[paramMeta.name];
        } else {
            val = req.body;
        }
        break;
      case "header":
        val = req.headers[paramMeta.name];
        break;
      case "cookie":
        val = req.cookies[paramMeta.name];
        break;
      case "query":
      default:
        if (paramMeta.name) {
            val = req.query[paramMeta.name];
        } else {
            val = req.query;
        }
        break;
    }
    if (paramMeta.type) {
      if (paramMeta.type === "boolean") {
        val = !!val;
      }
      if (paramMeta.type === "number") {
        val = Number(val);
      }
    }
    return val;
  }
}

const interceptor = new RouteInterceptor();

export default interceptor;
