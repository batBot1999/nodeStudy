const http = require("http");
// get请求简便方法
http.get("http://localhost:3000/api1?a=789", (res) => {
  // 请求的res返回是可读流,因为我是请求的发出者,注意与服务端相反,服务端req是可读流,res是可写流
  let data = "";
  res.on("data", (chunk) => {
    data += chunk;
  })
  res.on("end", () => {
    console.log(JSON.parse(data));
  });
})
// 得到{ data: [ 1, 2, 3 ], a: '789' }


// post请求只能老老实实用request去发
const req = http.request({
  hostname: "localhost",
  port: "3000",
  path: "/api2",
  method: "POST",
}, (res) => {
  let data = "";
  res.on("data", (chunk) => {
    data += chunk;
  })
  res.on("end", () => {
    console.log(data); // post请求响应回来的是字符串,不是json,不用解析
  });
})
// 设置请求头
req.write(JSON.stringify({
  a: 123,
  b: 456,
  c: 12
}))
req.end("post请求写入完成")
// 请求了post接口,请求参数为{"a":123,"b":456,"c":12}post请求写入完成
// { data: [ 1, 2, 3 ], a: '789' }
// 如果用错误的请求方式会报错400,就是我们设置的状态码