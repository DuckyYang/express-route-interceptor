"use strict";
/*
 * @Author: Ducky Yang
 * @Date: 2021-02-03 15:05:35
 * @LastEditTime: 2021-02-04 11:35:34
 * @LastEditors: Ducky Yang
 * @Description:
 * @FilePath: \express-route-interceptor\src\route-interceptor.ts
 */
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var route_meta_1 = require("./route-meta");
var express_1 = __importDefault(require("express"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
/**
 * express route interceptor
 */
var RouteInterceptor = /** @class */ (function () {
    function RouteInterceptor() {
        this.Parser = "json";
        /**
         * route mappings
         */
        this.RouteMappings = [];
    }
    /**
     * add a route meta
     * @param meta route meta
     */
    RouteInterceptor.prototype.addMeta = function (meta) {
        this.RouteMappings.push(meta);
    };
    /**
     * get a route meta by name
     * @param name route meta name
     */
    RouteInterceptor.prototype.getMeta = function (name) {
        var meta = this.RouteMappings.filter(function (x) { return x.name === name; })[0];
        if (!meta) {
            meta = new route_meta_1.RouteMeta();
            meta.name = name;
            this.RouteMappings.push(meta);
        }
        return meta;
    };
    /**
     * get method meta of route
     * @param meta route meta
     * @param methodName method name
     */
    RouteInterceptor.prototype.getMethodMeta = function (meta, methodName) {
        var methodMeta = meta.routes.filter(function (x) { return x.name === methodName; })[0];
        if (!methodMeta) {
            methodMeta = new route_meta_1.RouteMethodMeta();
            methodMeta.name = methodName;
            meta.routes.push(methodMeta);
        }
        return methodMeta;
    };
    /**
     * get param meta of method
     * @param methodMeta
     * @param paramName
     */
    RouteInterceptor.prototype.getParamMeta = function (methodMeta, paramName, paramFrom) {
        var paramMeta = methodMeta.params.filter(function (x) { return x.name === paramName && x.from === paramFrom; })[0];
        if (!paramMeta) {
            paramMeta = new route_meta_1.RouteParamMeta();
            paramMeta.name = paramName;
            paramMeta.from = paramFrom;
            methodMeta.params.push(paramMeta);
        }
        return paramMeta;
    };
    /**
     * bind routes to app
     * @param app express instance
     */
    RouteInterceptor.prototype.bind = function (app, parser) {
        var _this = this;
        /**
         * use body parser
         */
        if (parser === "urlencoded") {
            this.Parser = "urlencoded";
            app.use(express_1.default.urlencoded());
        }
        else {
            this.Parser = "json";
            app.use(express_1.default.json());
        }
        app.use(cookie_parser_1.default());
        //
        this.RouteMappings.forEach(function (routeMeta) {
            var router = express_1.default.Router();
            //
            routeMeta.routes.forEach(function (methodMeta) {
                var method = methodMeta.method, executor = methodMeta.executor, template = methodMeta.template, params = methodMeta.params;
                // common middleware for every request
                var middleware = function (req, res, next) {
                    //
                    var ps = [];
                    //
                    params
                        .sort(function (x) { return x.index; })
                        .forEach(function (p) {
                        ps.push(_this.extractParameters(req, p));
                    });
                    // call executor
                    var result = executor.call.apply(executor, __spreadArrays([routeMeta.instance], ps.reverse()));
                    // if executor returns promise
                    if (result instanceof Promise) {
                        result
                            .then(function (value) {
                            !res.headersSent && res.json(value);
                        })
                            .catch(function (err) {
                            next(err);
                        });
                    }
                    else if (result) {
                        !res.headersSent && res.json(result);
                    }
                };
                router[method](template, middleware);
            });
            app.use(routeMeta.prefix, router);
        });
    };
    RouteInterceptor.prototype.extractParameters = function (req, paramMeta) {
        var paramHandler = {
            "path": function (name) {
                return req.params[name];
            },
            "query": function (name) {
                return name ? req.query[name] : req.query;
            },
            "body": function (name) {
                return name ? req.body[name] : req.body;
            },
            "header": function (name) {
                return req.headers[name];
            },
            "cookie": function (name) {
                return req.cookies[name];
            }
        };
        var val = paramHandler[paramMeta.from](paramMeta.name);
        if (paramMeta.type) {
            if (paramMeta.type === "boolean") {
                val = !!val;
            }
            if (paramMeta.type === "number") {
                val = Number(val);
            }
        }
        return val;
    };
    return RouteInterceptor;
}());
var interceptor = new RouteInterceptor();
exports.default = interceptor;
