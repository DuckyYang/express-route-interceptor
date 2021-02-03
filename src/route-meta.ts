/*
 * @Author: Ducky Yang
 * @Date: 2021-02-03 14:58:10
 * @LastEditTime: 2021-02-03 17:45:44
 * @LastEditors: Ducky Yang
 * @Description:
 * @FilePath: \express-route-inceptor\src\route-meta.ts
 */

type paramFrom = "path" | "query" | "body" | "header" | "cookie";
type httpMethod = "get" | "post" | "put" | "delete" | "patch";

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
  methodFn: Function = () => {};
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
  from: paramFrom = "path";
}

export { RouteMeta, RouteMethodMeta, RouteParamMeta, paramFrom, httpMethod };
