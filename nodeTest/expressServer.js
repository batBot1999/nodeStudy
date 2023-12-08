const e = require("express");
const express = require("express");
const app = express();
const multer = require("multer"); // 文件解析
const uploader = multer({
  dest: "upload/",
})
// 只对/b路径生效的中间件
// app.use("/b", () => {中间件})
// 对所有都生效的中间件
// app.use("", () => {中间件})

// 网站打开之后请求的文件叫静态资源文件,会存在于静态资源文件目录,避免css失效,直接访问js也访问的到  localhost:8000/code.js
app.use(express.static(__dirname + "/static"));
app.use((req, res, next) => {
  console.log(1);
  // res.setHeader() // 一次设置一个请求头
  res.header('Access-Control-Allow-Origin', '*'); // 也可以设置端口
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE'); // 允许跨域的方法
  res.header('Access-Control-Allow-Headers', 'Content-Type'); // 允许跨域的请求头
  // 一次设置一堆 === res.set
  res.header({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  next();
})
app.use(express.urlencoded()); // 解析post请求头为application/x-www-form-urlencoded时使用这个中间件 表单 字符串
app.use(express.json()); // 解析post请求头为application/json时使用这个中间件
app.use(express.text()); // 纯文本类型,txt/plain
app.use((req, res, next) => {
  console.log(2);
  next();
})
// 对所有的请求方式和路径都执行
// app.all("*")

// 也相当于中间件
app.get("/api1", (req, res) => {
  // res.end("ok")
  // res.sendFile();
  // get请求获取参数
  console.log(req.query);
  res.json({
    a: [1, 2, 3]
  })
})
app.post("/api2", (req, res) => {
  // post请求获取参数
  // 如果query是一个JSON.stringify({ b:999 }) 直接获取是undefind 需要中间件express.urlencoded
  // 如果query时{ b: 999 } content-type是json,需要解析json中间件
  console.log(req.body);
  res.json({
    b: 999
  })
})

// 发送页面
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index2.html"); // 但html中引入css不会生效,因为没有做处理
})
app.listen(8000);

// 上传文件
// 前端就是input type="file" @change="fileChange" 然后点击按钮触发提交方法
// fileChange(e) {
//   thils.file = e.target.file[0]
// }
// submitFile(e) {
//  let _form = new FormData();
//  _form.append('file', this.file);
//  axios.post("http://localhost:8000/api1", _form).then(() =>{
//  })
// }
app.post("/api3", uploader.single("file"), (req, res) => { // 上传接口中间件
  console.log(req.body);
  res.json({
    mes: "文件已收到"
  })
})    