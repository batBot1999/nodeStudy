const express = requre("express");
const router = express.Router();
const app = express();
const multer = require("multer"); // 文件解析
const uploader = multer({
  dest: "upload/",
})
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
// testAAAA bbbb