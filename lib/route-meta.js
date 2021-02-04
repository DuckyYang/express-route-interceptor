"use strict";
/*
 * @Author: Ducky Yang
 * @Date: 2021-02-03 14:58:10
 * @LastEditTime: 2021-02-04 09:32:09
 * @LastEditors: Ducky Yang
 * @Description:
 * @FilePath: \express-route-interceptor\src\route-meta.ts
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteParamMeta = exports.RouteMethodMeta = exports.RouteMeta = void 0;
var RouteMeta = /** @class */ (function () {
    function RouteMeta() {
        /**
         * route meta name
         */
        this.name = "";
        /**
         * route prefix
         */
        this.prefix = "";
        /**
         * route meta
         */
        this.routes = [];
    }
    return RouteMeta;
}());
exports.RouteMeta = RouteMeta;
var RouteMethodMeta = /** @class */ (function () {
    function RouteMethodMeta() {
        /**
         * method name
         */
        this.name = "";
        /**
         * current route http method
         */
        this.method = "";
        /**
         * current route template
         */
        this.template = "";
        /**
         * current route params array
         */
        this.params = [];
        /**
         * method call
         */
        this.executor = function () { };
    }
    return RouteMethodMeta;
}());
exports.RouteMethodMeta = RouteMethodMeta;
var RouteParamMeta = /** @class */ (function () {
    function RouteParamMeta() {
        /**
         * route param index of method
         */
        this.index = 0;
        /**
         * route param name
         */
        this.name = "";
        /**
         * where to get param value
         */
        this.from = "path";
    }
    return RouteParamMeta;
}());
exports.RouteParamMeta = RouteParamMeta;
