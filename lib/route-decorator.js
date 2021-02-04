"use strict";
/*
 * @Author: Ducky Yang
 * @Date: 2021-02-03 14:24:12
 * @LastEditTime: 2021-02-04 09:46:18
 * @LastEditors: Ducky Yang
 * @Description: route decorator
 * @FilePath: \express-route-interceptor\src\route-decorator.ts
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cookie = exports.Header = exports.Body = exports.Query = exports.Path = exports.Patch = exports.Delete = exports.Put = exports.Post = exports.Get = exports.RoutePrefix = void 0;
var route_interceptor_1 = __importDefault(require("./route-interceptor"));
/**
 *
 * @param prefix route prefix
 * ```
 * @RoutePrefix("api/users")
 * class UserController {}
 * ```
 */
function RoutePrefix(prefix) {
    return function (target) {
        var metaName = target.name;
        var meta = route_interceptor_1.default.getMeta(metaName);
        meta.prefix = prefix;
        meta.instance = new target();
    };
}
exports.RoutePrefix = RoutePrefix;
var MethodFactory = function (httpMethod) {
    return function (template) {
        return function (target, methodName, descriptor) {
            // 
            var metaName = target.constructor.name;
            // get route meta
            var meta = route_interceptor_1.default.getMeta(metaName);
            // get method meta of route
            var methodMeta = route_interceptor_1.default.getMethodMeta(meta, methodName);
            // bind 
            methodMeta.executor = typeof descriptor.value === "function" ? descriptor.value : function () { };
            methodMeta.method = httpMethod;
            methodMeta.template = template;
        };
    };
};
var ParamFactory = function (paramFrom) {
    return function (paramName, type) {
        return function (target, methodName, parameterIndex) {
            var metaName = target.constructor.name;
            var meta = route_interceptor_1.default.getMeta(metaName);
            var methodMeta = route_interceptor_1.default.getMethodMeta(meta, methodName);
            // bind
            var paramMeta = route_interceptor_1.default.getParamMeta(methodMeta, paramName);
            paramMeta.index = parameterIndex;
            paramMeta.from = paramFrom;
            paramMeta.type = type;
        };
    };
};
/**
 * http method
 */
exports.Get = MethodFactory("get");
exports.Post = MethodFactory("post");
exports.Put = MethodFactory("put");
exports.Delete = MethodFactory("delete");
exports.Patch = MethodFactory("patch");
/**
 * parameters from
 */
exports.Path = ParamFactory("path");
exports.Query = ParamFactory("query");
exports.Body = ParamFactory("body");
exports.Header = ParamFactory("header");
exports.Cookie = ParamFactory("cookie");
