import { RouteMeta, RouteMethodMeta, RouteParamMeta, ParamFrom } from "./route-meta";
import * as core from "express-serve-static-core";
export declare type ExpressParser = "json" | "urlencoded";
/**
 * express route interceptor
 */
declare class RouteInterceptor {
    Parser: ExpressParser;
    /**
     * route mappings
     */
    RouteMappings: RouteMeta[];
    /**
     * add a route meta
     * @param meta route meta
     */
    addMeta(meta: RouteMeta): void;
    /**
     * get a route meta by name
     * @param name route meta name
     */
    getMeta(name: string): RouteMeta;
    /**
     * get method meta of route
     * @param meta route meta
     * @param methodName method name
     */
    getMethodMeta(meta: RouteMeta, methodName: string): RouteMethodMeta;
    /**
     * get param meta of method
     * @param methodMeta
     * @param paramName
     */
    getParamMeta(methodMeta: RouteMethodMeta, paramName: string, paramFrom: ParamFrom): RouteParamMeta;
    /**
     * bind routes to app
     * @param app express instance
     */
    bind(app: core.Express, parser: ExpressParser): void;
    private extractParameters;
}
declare const interceptor: RouteInterceptor;
export default interceptor;
