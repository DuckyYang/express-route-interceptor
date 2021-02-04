/*
 * @Author: Ducky Yang
 * @Date: 2021-02-03 14:24:12
 * @LastEditTime: 2021-02-04 11:35:43
 * @LastEditors: Ducky Yang
 * @Description: route decorator
 * @FilePath: \express-route-interceptor\src\route-decorator.ts
 */

import {
  ParamFrom, ParamType,
} from "./route-meta";
import RouteInterceptor from "./route-interceptor";

/**
 *
 * @param prefix route prefix
 * ```
 * @RoutePrefix("/api/users")
 * class UserController {}
 * ```
 */
export function RoutePrefix(prefix: string) {
  return function (target: any) {
    const metaName = target.name;
    let meta = RouteInterceptor.getMeta(metaName);
    meta.prefix = prefix;
    meta.instance = new target();
  };
}

const MethodFactory = (httpMethod: string) => {
  return (template: string) => {
    return (
      target: any,
      methodName: string,
      descriptor: PropertyDescriptor
    ) => {
      // 
      const metaName = target.constructor.name;
      // get route meta
      let meta = RouteInterceptor.getMeta(metaName);
      // get method meta of route
      let methodMeta = RouteInterceptor.getMethodMeta(meta, methodName);
      // bind 
      methodMeta.executor = typeof descriptor.value === "function" ? descriptor.value : ()=>{};
      methodMeta.method = httpMethod;
      methodMeta.template = template;
    };
  };
};

const ParamFactory = (paramFrom: ParamFrom) => {
  return function (paramName: string,type?:ParamType) {
    return function (target: any, methodName: string, parameterIndex: number) {
      const metaName = target.constructor.name;
      let meta = RouteInterceptor.getMeta(metaName);
    
      let methodMeta = RouteInterceptor.getMethodMeta(meta, methodName);
      // bind
      let paramMeta = RouteInterceptor.getParamMeta(methodMeta, paramName, paramFrom);
      paramMeta.index = parameterIndex;
      paramMeta.type = type;
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