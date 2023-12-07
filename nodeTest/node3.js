const fs = require("fs")
// 创建一个10位的buffer对象,指定1填充
// const bf1 = Buffer.alloc(10, "1")
// console.log(bf1.toString())
// const bf2 = Buffer.from("fsdfdssdfsdf");
// console.log(bf2.toString());
// const bf3 = Buffer.from(JSON.stringify({a:1}));
// console.log(bf3.toString());

const rstream = fs.createReadStream("./stream1.exe", {
  highWaterMark: 500 // 长度为500的buffer
})
const wstream = fs.createWriteStream("./stream2.exe")
// 每次从数据源读取一个buffer就写入进去,读一个写一个,end后关闭
rstream.on("data", (buff)=> {
  wstream.write(buff);
})

// 执行后会监听换个流输出大量的buffer
// rstream.on("finish")
// rstream.on("error")
rstream.on("end", ()=>{
  wstream.close()
  console.log("end")
})
wstream.on("end", ()=> {
  console.log("写入完毕")
})