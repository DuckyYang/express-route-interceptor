"use strict";
/*
 * @Author: Ducky Yang
 * @Date: 2021-02-03 18:21:00
 * @LastEditTime: 2021-02-04 10:55:07
 * @LastEditors: Ducky Yang
 * @Description:
 * @FilePath: \express-route-interceptor\src\main.ts
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteParamMeta = exports.RouteMethodMeta = exports.RouteMeta = exports.RouteInterceptor = exports.Cookie = exports.Header = exports.Body = exports.Query = exports.Path = exports.Patch = exports.Delete = exports.Put = exports.Post = exports.Get = exports.RoutePrefix = void 0;
var route_decorator_1 = require("./route-decorator");
Object.defineProperty(exports, "RoutePrefix", { enumerable: true, get: function () { return route_decorator_1.RoutePrefix; } });
Object.defineProperty(exports, "Get", { enumerable: true, get: function () { return route_decorator_1.Get; } });
Object.defineProperty(exports, "Post", { enumerable: true, get: function () { return route_decorator_1.Post; } });
Object.defineProperty(exports, "Put", { enumerable: true, get: function () { return route_decorator_1.Put; } });
Object.defineProperty(exports, "Delete", { enumerable: true, get: function () { return route_decorator_1.Delete; } });
Object.defineProperty(exports, "Patch", { enumerable: true, get: function () { return route_decorator_1.Patch; } });
Object.defineProperty(exports, "Path", { enumerable: true, get: function () { return route_decorator_1.Path; } });
Object.defineProperty(exports, "Query", { enumerable: true, get: function () { return route_decorator_1.Query; } });
Object.defineProperty(exports, "Body", { enumerable: true, get: function () { return route_decorator_1.Body; } });
Object.defineProperty(exports, "Header", { enumerable: true, get: function () { return route_decorator_1.Header; } });
Object.defineProperty(exports, "Cookie", { enumerable: true, get: function () { return route_decorator_1.Cookie; } });
var route_interceptor_1 = __importDefault(require("./route-interceptor"));
exports.RouteInterceptor = route_interceptor_1.default;
var route_meta_1 = require("./route-meta");
Object.defineProperty(exports, "RouteMeta", { enumerable: true, get: function () { return route_meta_1.RouteMeta; } });
Object.defineProperty(exports, "RouteMethodMeta", { enumerable: true, get: function () { return route_meta_1.RouteMethodMeta; } });
Object.defineProperty(exports, "RouteParamMeta", { enumerable: true, get: function () { return route_meta_1.RouteParamMeta; } });
