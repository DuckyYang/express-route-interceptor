/*
 * @Author: Ducky Yang
 * @Date: 2021-02-03 15:05:35
 * @LastEditTime: 2021-02-03 18:12:27
 * @LastEditors: Ducky Yang
 * @Description: 
 * @FilePath: \express-route-inceptor\src\route-inceptor.ts
 */

import { RouteMeta, httpMethod, paramFrom } from "./route-meta";
import * as core from "express-serve-static-core";
import express, { Request, Response, NextFunction } from "express";


 class RouteInceptor {
     RouteMappings: RouteMeta[] = [];
     
     registe(meta: RouteMeta){
        this.RouteMappings.push(meta);
     }
     getRouteMeta(name: string){
        return this.RouteMappings.filter(x=>x.name === name)[0];
     }
     bind(app:core.Express){
        const router = express.Router();

        // bind registe route mapping info
        this.RouteMappings.forEach(routeMeta=>{
            routeMeta.routes.forEach(methodMeta=>{
                const method = <httpMethod>methodMeta.method;
                const fn = methodMeta.methodFn;
                const template = methodMeta.template;
                const params = methodMeta.params;
                const middleware = (req:Request, res:Response, next:NextFunction) => {
                    // 
                    let ps: any[] = [];
                    params.sort(x=>x.index).forEach(p=>{
                        let val;
                        switch (p.from) {
                            case "path":
                                val = req.params[p.name];
                                break;
                            case "query":
                                val = req.query[p.name];
                                break;
                            case "body":
                                val = req.body;
                                break;
                            case "header":
                                val = req.headers[p.name];
                                break;
                            case "cookie":
                                val = req.cookies[p.name];
                                break;
                            default:
                                val = "";
                                break;
                        }
                        ps.push(val);
                    });
                    let result = fn.call(fn, ps);
                    if (result instanceof Promise) {
                        result.then(value => {
                            !res.headersSent && res.json(value);
                        }).catch(err => {
                            next(err);
                        });
                    } else if (result !== undefined) {
                        !res.headersSent && res.json(result);
                    }
                };

                router[method](template , middleware);
            });

            app.use(routeMeta.prefix, router);
        });
     }
 }

 const inceptor = new RouteInceptor();

 export default inceptor;