# express-route-interceptor

> Author: Ducky Yang
>
> Email: duckyyang@vip.qq.com

#### 
> A light-weight module to build restful api route with express
>
> ##### Thanks for @WinfredWang's article and his repo is `https://github.com/WinfredWang/express-decorator`

### Install

```
npm install express-route-interceptor
```

### Features

- Use `@RoutePrefix` to define rest api prefix for class.
- Use `@Get/@Post/@Put/@Delete/@Patch` to define rest api template for method.
- Use `@Path/@Query/@Body/@Header/@Cookie` to inject parameter's value.
- If query parameters are too many, you can set empty `paramName` for `@Query` like `@Query("")queryData: any`. Then queryData will contains all parameters. 
- If you want to get specified parameter from body, you can set `paramName` for `@Body` like `@Body("name")name:string`. Then name will be filled if body contains key of name. But this is not recommended. 

### Quick Start

Create first restful api controller

```javascript
interface IUserModel {
    name: string;
    age: number;
}
interface IPageModel {
    pageNo: number;
    pageSize: number;
}

@RoutePrefix("/api/users")
class UserCtroller {
    @Get("/:id")
    async get(@Path("id","number")id:number) {
        return `hello world ${id}`;
    }

    @Post("") 
    async post(@Body("")user: IUserModel) {
        return `hello ${user.name}`;
    }

    @Get("")
    async page(@Query("")page: IPageModel){
        return userService.page(page.pageNo,page.pageSize);
    }
}
```

Bind to your app

```javascript
 import express from "express";

 import { RouteInterceptor } from "express-route-interceptor";

 const app = express();
 // bind to app and use json parser
 RouteInterceptor.bind(app, "json", [UserCtroller]);

 app.listen(8080,"localhost",()=>{});
```

### API

#### Bind To Express App
> Call bind method before app runs

- `RouteInterceptor.bind(app: core.Express, parser: ExpressParser)`: bind route meta
- `RouteInterceptor.use(app: core.Express, middleware:(req:Request,res:Response,next:NextFunction)=>{})`: use custom middleware. call this before bind method.

#### Route Prefix
> Define api base url prefix, like `/api/users`

- `RoutePrefix(prefix: string)`
#### Route Action
> Define api action url template, like `/:id` or `/man/:name`

- `Get(template: string)`
- `Post(template: string)`
- `Put(template: string)`
- `Delete(template: string)`
- `Patch(template: string)`
#### Route Action Parameters
> Define where to get parameter's value

- `Path(paramName: string, type?: "number" | "boolean" | undefined)` 
- `Query(paramName: string, type?: "number" | "boolean" | undefined)`
- `Body(paramName: string, type?: "number" | "boolean" | undefined)`
- `Cookie(paramName: string, type?: "number" | "boolean" | undefined)`
- `Header(paramName: string, type?: "number" | "boolean" | undefined)`

##### Parameters
- `paramName`: Parameter name
- `type`: If the type is set, the value will be converted.Only support `number` and `boolean`
