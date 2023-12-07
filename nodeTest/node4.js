const http = require("http");
const url = require("url");
const fs = require("fs")
// 构建服务对象,回调req是请求,res响应
const server = http.createServer();
server.on("request", (req, res) => {
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
      a: urlObj.query
    }))
  }
})
server.listen(3000);