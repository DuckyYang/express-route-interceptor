# express-route-interceptor

> Author: Ducky Yang
>
> Email: duckyyang@vip.qq.com

#### 
> A light-weight module to build restful api route with express
>
> Thanks for @WinfredWang's guide,and his repo is https://github.com/WinfredWang/express-decorator

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

