/*
 * @Author: Ducky Yang
 * @Date: 2021-02-03 14:24:12
 * @LastEditTime: 2021-02-03 22:10:48
 * @LastEditors: Ducky Yang
 * @Description: route decorator
 * @FilePath: /express-route-interceptor/src/route-decorator.ts
 */

import {
  RouteMeta,
  RouteMethodMeta,
  RouteParamMeta,
  paramFrom,
} from "./route-meta";
import RouteInterceptor from "./route-interceptor";

/**
 *
 * @param prefix route prefix
 * ```
 * @RoutePrefix("api/users")
 * class UserController {}
 * ```
 */
export function RoutePrefix(prefix: string) {
  return function (target: any) {
    let newMeta = false;
    const metaName = target.name;
    let meta = RouteInterceptor.getMeta(metaName);
    if (!meta) {
      meta = new RouteMeta();
      meta.name = metaName;

      newMeta = true;
    }
    meta.prefix = prefix;

    if (newMeta) {
      RouteInterceptor.addMeta(meta);
    }
  };
}

const MethodFactory = (httpMethod: string) => {
  return (template: string) => {
    return (
      target: any,
      methodName: string,
      descriptor: PropertyDescriptor
    ) => {
      const metaName = target.constructor.name;

      let newMeta = false,
        newMethod = false;
      let meta = RouteInterceptor.getMeta(metaName);
      if (!meta) {
        meta = new RouteMeta();
        meta.name = metaName;

        newMeta = true;
      }
      let methodMeta = meta.routes.filter((x) => x.name === methodName)[0];
      if (!methodMeta) {
        methodMeta = new RouteMethodMeta();
        methodMeta.name = methodName;

        newMethod = true;
      }
      methodMeta.executor = typeof descriptor.value === "function" ? descriptor.value : ()=>{};
      methodMeta.method = httpMethod;
      methodMeta.template = template;

      if (newMethod) {
        meta.routes.push(methodMeta);
      }
      if (newMeta) {
        RouteInterceptor.addMeta(meta);
      }
    };
  };
};

const ParamFactory = (paramFrom: paramFrom) => {
  return function (paramName: string) {
    return function (target: any, methodName: string, parameterIndex: number) {
      const metaName = target.constructor.name;
      let meta = RouteInterceptor.getMeta(metaName);
      let newMeta = false,
        newMethod = false;
      if (!meta) {
        meta = new RouteMeta();
        meta.name = metaName;

        newMeta = true;
      }
      let methodMeta = meta.routes.filter((x) => x.name === methodName)[0];
      if (!methodMeta) {
        methodMeta = new RouteMethodMeta();
        methodMeta.name = methodName;

        newMethod = true;
      }
      let paramMeta = new RouteParamMeta();
      paramMeta.index = parameterIndex;
      paramMeta.name = paramName;
      paramMeta.from = paramFrom;
      methodMeta.params.push(paramMeta);
      if (newMethod) {
        meta.routes.push(methodMeta);
      }
      if (newMeta) {
        RouteInterceptor.addMeta(meta);
      }
    };
  };
};

/**
 * http method
 */
export const Get = MethodFactory("get");
export const Post = MethodFactory("post");
export const Put = MethodFactory("put");
export const Delete = MethodFactory("delete");
export const Patch = MethodFactory("patch");
/**
 * parameters from 
 */
export const Path = ParamFactory("path");
export const Query = ParamFactory("query");
export const Body = ParamFactory("body");
export const Header = ParamFactory("header");
export const Cookie = ParamFactory("cookie");