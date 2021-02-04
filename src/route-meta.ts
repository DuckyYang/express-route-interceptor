/*
 * @Author: Ducky Yang
 * @Date: 2021-02-03 14:58:10
 * @LastEditTime: 2021-02-04 15:02:56
 * @LastEditors: Ducky Yang
 * @Description:
 * @FilePath: \express-route-interceptor\src\route-meta.ts
 */

type ParamFrom = "path" | "query" | "body" | "header" | "cookie";
type HttpMethod = "get" | "post" | "put" | "delete" | "patch";
type ParamType = "boolean"|"number";

class RouteMeta {
  /**
   * route meta name
   */
  name: string = "";
  /**
   * route prefix
   */
  prefix: string = "";
  /**
   * route meta
   */
  routes: RouteMethodMeta[] = [];
}
class RouteMethodMeta {
  /**
   * method name
   */
  name: string = "";
  /**
   * current route http method
   */
  method: string = "";
  /**
   * current route template
   */
  template: string = "";
  /**
   * current route params array
   */
  params: RouteParamMeta[] = [];
  /**
   * method call
   */
  executor: Function = () => {};
}

class RouteParamMeta {
  /**
   * route param index of method
   */
  index: number = 0;
  /**
   * route param name
   */
  name: string = "";
  /**
   * where to get param value
   */
  from: ParamFrom = "path";
  /**
   * if type is set, value will be cast
   */
  type?: ParamType;
}

export { RouteMeta, RouteMethodMeta, RouteParamMeta, ParamFrom, HttpMethod, ParamType};
