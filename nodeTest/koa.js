const Koa = require('koa');
// 解决post请求体解析
const koabody = require("koa-body");
const koarouter = require("koa-router");
const app = new Koa();
const router = new koarouter()


app.use((ctx, next) => {
    console.log(2);
    ctx.body = "hello1";
    next();
})
app.use((ctx, next) => {
    console.log(3);
    ctx.body = "hello2";
    next();
})
// 单独文件
router.get("/api1", (ctx, next) => {
    ctx.body = {
        a: 123,
        b: 23
    }
})
router.post("/api2", (ctx, next) => {
    console.log(ctx.request.body)
    ctx.body = "hello"
})
app.use(koaBody({
    multer: true
}))
app.use((ctx, next) => { // req和res被koa包装成ctx
    // koa中如果没有next到下一个中间件,后续中间件都不生效,但也不会像express那样卡住
    console.log(1)
    console.log(ctx.url);
    console.log(ctx.query);
    if (ctx.method == "POST") {
        console.log(ctx.request.body);
    }
    ctx.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    ctx.body = "hello";
    next();
})
app.use(router.routes());
app.listen(3000);