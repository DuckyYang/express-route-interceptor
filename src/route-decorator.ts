/*
 * @Author: Ducky Yang
 * @Date: 2021-02-03 14:24:12
 * @LastEditTime: 2021-02-03 17:38:07
 * @LastEditors: Ducky Yang
 * @Description: route decorator
 * @FilePath: \express-route-inceptor\src\route-decorator.ts
 */

import {
  RouteMeta,
  RouteMethodMeta,
  RouteParamMeta,
  paramFrom,
} from "./route-meta";
import RouteInceptor from "./route-inceptor";

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
    const metaName = target.constructor.name;
    let meta = RouteInceptor.getRouteMeta(metaName);
    if (!meta) {
      meta = new RouteMeta();
      meta.name = metaName;

      newMeta = true;
    }
    meta.prefix = prefix;

    if (newMeta) {
      RouteInceptor.registe(meta);
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
      let meta = RouteInceptor.getRouteMeta(metaName);
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
      methodMeta.methodFn = typeof descriptor.value === "function" ? descriptor.value : ()=>{};
      methodMeta.method = httpMethod;
      methodMeta.template = template;

      if (newMethod) {
        meta.routes.push(methodMeta);
      }
      if (newMeta) {
        RouteInceptor.registe(meta);
      }
    };
  };
};

const ParamFactory = (paramFrom: paramFrom) => {
  return function (paramName: string) {
    return function (target: any, methodName: string, parameterIndex: number) {
      const metaName = target.constructor.name;
      let meta = RouteInceptor.getRouteMeta(metaName);
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
        RouteInceptor.registe(meta);
      }
    };
  };
};

/**
 * http method
 */
export const HttpGet = MethodFactory("get");
export const HttpPost = MethodFactory("post");
export const HttpPut = MethodFactory("put");
export const HttpDelete = MethodFactory("delete");
export const HttpPatch = MethodFactory("patch");
/**
 * parameters from 
 */
export const FromPath = ParamFactory("path");
export const FromQuery = ParamFactory("query");
export const FromBody = ParamFactory("body");
export const FromHeader = ParamFactory("header");
export const FromCookie = ParamFactory("cookie");