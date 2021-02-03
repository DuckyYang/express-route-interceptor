/*
 * @Author: Ducky Yang
 * @Date: 2021-02-03 15:05:35
 * @LastEditTime: 2021-02-03 22:10:03
 * @LastEditors: Ducky Yang
 * @Description: 
 * @FilePath: /express-route-interceptor/src/route-interceptor.ts
 */ 

import { RouteMeta, httpMethod } from "./route-meta";
import * as core from "express-serve-static-core";
import express, { Request, Response, NextFunction } from "express";

/**
 * express route interceptor
 */
 class RouteInterceptor { 
     /**
      * route mappings
      */
     RouteMappings: RouteMeta[] = [];
     /**
      * add a route meta
      * @param meta route meta 
      */
     addMeta(meta: RouteMeta){
        this.RouteMappings.push(meta);
     }
     /**
      * get a route meta by name
      * @param name route meta name
      */
     getMeta(name: string){
        return this.RouteMappings.filter(x=>x.name === name)[0];
     }
     /**
      * bind routes to app
      * @param app express instance
      */
     bind(app:core.Express){
         /**
          * use json parser
          */
         app.use(express.json());

        const router = express.Router();

        // 
        this.RouteMappings.forEach(routeMeta=>{
            //
            routeMeta.routes.forEach(methodMeta=>{
                const {method, executor, template, params} = methodMeta;

                // common middleware for every request
                const middleware = (req:Request, res:Response, next:NextFunction) => {
                    // 
                    let ps: any[] = [];
                    // 
                    params.sort(x=>x.index).reverse().forEach(p=>{
                        /**
                         * To-do: type cast for number or string or boolean
                         */
                        let val;
                        switch (p.from) {
                            case "path":
                                val = req.params[p.name];
                                break;
                            case "body":
                                // if param is from body, do not use name to get param
                                val = req.body;
                                break;
                            case "header":
                                val = req.headers[p.name];
                                break;
                            case "cookie":
                                val = req.cookies[p.name];
                                break;
                            case "query":
                            default:
                                // if not set from, default get it from query
                                val = req.query[p.name];
                                break;
                        }
                        ps.push(val);
                    });
                    // call executor
                    let result = executor.call(executor, ...ps.reverse());
                    // if executor returns promise
                    if (result instanceof Promise) {
                        result.then(value => {
                            !res.headersSent && res.json(value);
                        }).catch(err => {
                            next(err);
                        });
                    } else if (result) {
                        !res.headersSent && res.json(result);
                    }
                };
                router[<httpMethod>method](template , middleware);
            });

            app.use(routeMeta.prefix, router);
        });
     }
 }

 const interceptor = new RouteInterceptor();

 export default interceptor;