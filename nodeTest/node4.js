const http = require("http");
const url = require("url");
const fs = require("fs")
// 构建服务对象,回调req是请求,res响应
const server = http.createServer();
server.on("request", (req, res) => {
  // 响应头如何设置
  res.setHeader("a", "asd"); // 只能设置一条响应头
  res.writeHeader((200), {
    a: 123,
    b: 123
  }); // 还可以设置状态码和很多响应头
  console.log(req.headers); // 重启服务,发现响应状态变成400了,然后响应头有对应信息,但css样式会失效,设置为200就好了
  console.log(req.url); // 请求具体地址
  const urlObj = url.parse(req.url, true); // 第二个参数传true可以获得query对象,get请求方便处理,毕竟字符串不好处理
  // 这样判断存在问题,query参数也在url内,需要区分,引入url包,解析地址得到对象
  if (urlObj.pathname == "/page1") {
    // 可以写入很多,最后发出去
    res.write("hello1")
    res.write("hello2")
    res.write("hello3")
    res.end("page1") // 结束这个写入流,还可以附带内容
  }
  if (urlObj.pathname == "/htmlpage") {
    // 不要这样做,如果html很大的话,会很卡,要以流的形式去处理
    // fs.readFile("./html/index1.html")
    const _html = fs.createReadStream("./html/index1.html");
    _html.on("data", (chunk) => {
      // 写入流加入res中
      res.write(chunk);
    })
    _html.on("end", () => {
      res.end();
    })
  }
  if (urlObj.pathname == "/test.css") {
    const _css = fs.createReadStream("./test.css");
    _css.on("data", (chunk) => {
      // 写入流加入res中
      res.write(chunk)
    })
    _css.on("end", () => {
      res.end();
    })
  }
  // 接口请求
  if (urlObj.pathname == "/api1") {
    if (req.method != "GET") {
      res.statusCode = 400; // 请求方式错误
      res.end("请求方式有误");
    }
    let query = urlObj.query;
    res.end(JSON.stringify({
      data:[1,2,3],
      a: query.a
    }))
  }
  if (urlObj.pathname == "/api2") {
    if (req.method != "POST") {
      res.statusCode = 400; // 请求方式错误
      res.end("请求方式有误");
    }
    let query = urlObj.query;
    // res.end(JSON.stringify({
    //   data:[1,2,3],
    //   a: query.a
    // }))
  // post请求参数在req请求体内,而不像get请求在url里,所以只能用可读流去读它
  let post = ""
  req.on("data", (chunk) => {
    post += chunk; // 监听可读流然后拼接到post,不用toString因为给字符串拼接会自动转化为字符串
  })
  req.on("end", () => {
    res.end("请求了post接口,请求参数为" + post);
  })
  }
})
// 服务的本质
// req是可读流,res是写入流
// 借助url模块来解析url地址,方便操作
server.listen(3000, () => {
  console.log("服务器开启成功")
});
