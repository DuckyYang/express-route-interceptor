declare type ParamFrom = "path" | "query" | "body" | "header" | "cookie";
declare type HttpMethod = "get" | "post" | "put" | "delete" | "patch";
declare type ParamType = "boolean" | "number";
declare class RouteMeta {
    /**
     * route meta name
     */
    name: string;
    /**
     * route prefix
     */
    prefix: string;
    /**
     * current class instance used for when executor is called
     */
    instance: any;
    /**
     * route meta
     */
    routes: RouteMethodMeta[];
}
declare class RouteMethodMeta {
    /**
     * method name
     */
    name: string;
    /**
     * current route http method
     */
    method: string;
    /**
     * current route template
     */
    template: string;
    /**
     * current route params array
     */
    params: RouteParamMeta[];
    /**
     * method call
     */
    executor: Function;
}
declare class RouteParamMeta {
    /**
     * route param index of method
     */
    index: number;
    /**
     * route param name
     */
    name: string;
    /**
     * where to get param value
     */
    from: ParamFrom;
    /**
     * if type is set, value will be cast
     */
    type?: ParamType;
}
export { RouteMeta, RouteMethodMeta, RouteParamMeta, ParamFrom, HttpMethod, ParamType };
